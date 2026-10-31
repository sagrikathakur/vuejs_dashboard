<template>
  <div class="flex flex-col h-full">
    <!-- Filter Toolbar -->
    <div class="px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-3">
      <!-- Left: Search & Dropdown Filters -->
      <div class="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
        <!-- Search bar -->
        <div class="relative w-64">
          <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="taskStore.searchQuery"
            type="text"
            placeholder="Filter issues..."
            class="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        <!-- Priority Filter -->
        <select
          v-model="taskStore.selectedPriority"
          class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="all">All Priorities</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <!-- Assignee Filter -->
        <select
          v-model="taskStore.selectedAssignee"
          class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="all">All Assignees</option>
          <option
            v-for="member in teamStore.members"
            :key="member.id"
            :value="member.id"
          >
            {{ member.name }}
          </option>
        </select>

        <!-- Tag Filter -->
        <select
          v-model="taskStore.selectedLabel"
          class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="all">All Tags</option>
          <option v-for="label in taskStore.allLabels" :key="label" :value="label">
            {{ label }}
          </option>
        </select>

        <!-- Reset Filters Button -->
        <button
          v-if="hasActiveFilters"
          @click="resetFilters"
          class="px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Reset Filters</span>
        </button>
      </div>

      <!-- Right: Showing count & Quick Views -->
      <div class="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span>Showing <strong>{{ taskStore.filteredTasks.length }}</strong> of <strong>{{ taskStore.tasks.length }}</strong> issues</span>
      </div>
    </div>

    <!-- Columns Area -->
    <div class="flex-1 overflow-x-auto p-6">
      <div class="flex items-start gap-5 min-w-max pb-4">
        <KanbanColumn
          v-for="col in taskStore.columns"
          :key="col.id"
          :column="col"
          :tasks="taskStore.tasksByColumn[col.id] || []"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskStore } from '@/stores/useTaskStore';
import { useTeamStore } from '@/stores/useTeamStore';
import KanbanColumn from './KanbanColumn.vue';

const taskStore = useTaskStore();
const teamStore = useTeamStore();

const hasActiveFilters = computed(() => {
  return (
    taskStore.searchQuery.trim() !== '' ||
    taskStore.selectedPriority !== 'all' ||
    taskStore.selectedAssignee !== 'all' ||
    taskStore.selectedLabel !== 'all'
  );
});

const resetFilters = () => {
  taskStore.searchQuery = '';
  taskStore.selectedPriority = 'all';
  taskStore.selectedAssignee = 'all';
  taskStore.selectedLabel = 'all';
};
</script>

