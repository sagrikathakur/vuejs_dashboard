<template>
  <div
    class="flex flex-col w-80 shrink-0 bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl p-3 border border-slate-200/60 dark:border-slate-800/80 transition-all duration-200"
    :class="{ 'ring-2 ring-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20': isDragOver }"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <!-- Column Header -->
    <div class="flex items-center justify-between pb-3 px-1">
      <div class="flex items-center gap-2">
        <span :class="['w-2.5 h-2.5 rounded-full', columnColorClass]"></span>
        <h2 class="font-bold text-sm text-slate-800 dark:text-slate-200">
          {{ column.title }}
        </h2>
        <span class="text-xs px-2 py-0.5 rounded-full font-mono bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold shadow-xs">
          {{ tasks.length }}
        </span>
      </div>

      <div class="flex items-center gap-1">
        <!-- Story points sum in column -->
        <span
          v-if="totalColumnPoints > 0"
          class="text-[11px] font-mono text-slate-400 px-1.5 py-0.5"
          title="Total story points"
        >
          {{ totalColumnPoints }} pts
        </span>

        <!-- Quick Add Button -->
        <button
          @click="openAddForColumn"
          class="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          title="Add task to this column"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Cards Scroll Container -->
    <div class="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-210px)] pr-0.5 pb-2 min-h-[140px]">
      <KanbanCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
      />

      <!-- Empty state inside column -->
      <div
        v-if="tasks.length === 0"
        class="h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-center p-4 text-xs text-slate-400"
      >
        <svg class="w-5 h-5 mb-1 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <span>No issues in {{ column.title.toLowerCase() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTaskStore } from '@/stores/useTaskStore';
import KanbanCard from './KanbanCard.vue';

const props = defineProps({
  column: {
    type: Object,
    required: true
  },
  tasks: {
    type: Array,
    default: () => []
  }
});

const taskStore = useTaskStore();
const isDragOver = ref(false);

const columnColorClass = computed(() => {
  switch (props.column.id) {
    case 'backlog':
      return 'bg-slate-400';
    case 'todo':
      return 'bg-blue-500';
    case 'in_progress':
      return 'bg-amber-500';
    case 'review':
      return 'bg-purple-500';
    case 'done':
      return 'bg-emerald-500';
    default:
      return 'bg-indigo-500';
  }
});

const totalColumnPoints = computed(() => {
  return props.tasks.reduce((sum, t) => sum + (Number(t.points) || 0), 0);
});

const handleDragOver = () => {
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const handleDrop = (e) => {
  isDragOver.value = false;
  const taskId = e.dataTransfer.getData('text/plain');
  if (taskId) {
    taskStore.moveTask(taskId, props.column.id);
  }
};

const openAddForColumn = () => {
  taskStore.isCreateModalOpen = true;
};
</script>

