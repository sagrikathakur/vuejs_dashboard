<template>
  <div class="p-8 max-w-7xl mx-auto space-y-6 overflow-y-auto h-full">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Product Backlog & Epics
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Structured tabular view of all backlog stories, technical debt, and sprint issues.
        </p>
      </div>

      <button
        @click="taskStore.isCreateModalOpen = true"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all self-start sm:self-auto"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Backlog Story</span>
      </button>
    </div>

    <!-- Table Container -->
    <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <!-- Search / filter bar -->
      <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
        <div class="relative w-72">
          <svg class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="taskStore.searchQuery"
            type="text"
            placeholder="Search backlog..."
            class="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div class="text-xs text-slate-500 font-medium">
          Total Issues: <strong>{{ taskStore.filteredTasks.length }}</strong>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
            <tr>
              <th class="py-3 px-4">Key</th>
              <th class="py-3 px-4">Title</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4">Priority</th>
              <th class="py-3 px-4">Assignee</th>
              <th class="py-3 px-4 text-center">Points</th>
              <th class="py-3 px-4">Due Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            <tr
              v-for="task in taskStore.filteredTasks"
              :key="task.id"
              @click="taskStore.openTaskDetail(task.id)"
              class="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
            >
              <!-- Key -->
              <td class="py-3 px-4 font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                {{ task.id }}
              </td>

              <!-- Title & Labels -->
              <td class="py-3 px-4 font-semibold text-slate-900 dark:text-white max-w-md">
                <div class="flex items-center gap-2">
                  <span class="truncate">{{ task.title }}</span>
                  <span
                    v-for="l in (task.labels || []).slice(0, 2)"
                    :key="l"
                    class="px-1.5 py-0.2 rounded text-[10px] font-normal bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 shrink-0"
                  >
                    {{ l }}
                  </span>
                </div>
              </td>

              <!-- Status Dropdown (stop click propagation) -->
              <td class="py-3 px-4" @click.stop>
                <select
                  :value="task.status"
                  @change="e => taskStore.moveTask(task.id, e.target.value)"
                  class="px-2 py-1 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  <option value="backlog">Backlog</option>
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">In Review</option>
                  <option value="done">Completed</option>
                </select>
              </td>

              <!-- Priority -->
              <td class="py-3 px-4">
                <StatusBadge type="priority" :value="task.priority" />
              </td>

              <!-- Assignee -->
              <td class="py-3 px-4">
                <div class="flex items-center gap-2">
                  <img
                    :src="teamStore.getMemberById(task.assigneeId).avatar"
                    class="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{{ teamStore.getMemberById(task.assigneeId).name }}</span>
                </div>
              </td>

              <!-- Story Points -->
              <td class="py-3 px-4 text-center font-mono font-semibold">
                {{ task.points || '-' }}
              </td>

              <!-- Due Date -->
              <td class="py-3 px-4 font-mono text-slate-500">
                {{ formatDate(task.dueDate) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/useTaskStore';
import { useTeamStore } from '@/stores/useTeamStore';
import { formatDate } from '@/utils/formatters';
import StatusBadge from '@/components/common/StatusBadge.vue';

const taskStore = useTaskStore();
const teamStore = useTeamStore();
</script>

