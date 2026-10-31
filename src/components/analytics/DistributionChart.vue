<template>
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
    <div class="mb-4">
      <h3 class="font-bold text-sm text-slate-900 dark:text-white">Issue Pipeline Distribution</h3>
      <p class="text-xs text-slate-500 dark:text-slate-400">Current active workload by workflow state</p>
    </div>

    <!-- Visual Distribution Bars -->
    <div class="space-y-4 flex-1 flex flex-col justify-center">
      <div
        v-for="item in distributionItems"
        :key="item.id"
        class="space-y-1.5"
      >
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <span :class="['w-2.5 h-2.5 rounded-full', item.colorClass]"></span>
            <span class="font-semibold text-slate-700 dark:text-slate-300">{{ item.label }}</span>
          </div>
          <span class="font-mono text-slate-500 dark:text-slate-400">
            {{ item.count }} ({{ item.percent }}%)
          </span>
        </div>

        <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            :class="['h-2 rounded-full transition-all duration-500', item.barColorClass]"
            :style="{ width: `${item.percent}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskStore } from '@/stores/useTaskStore';

const taskStore = useTaskStore();

const distributionItems = computed(() => {
  const total = taskStore.tasks.length || 1;
  const counts = {
    backlog: taskStore.tasks.filter(t => t.status === 'backlog').length,
    todo: taskStore.tasks.filter(t => t.status === 'todo').length,
    in_progress: taskStore.tasks.filter(t => t.status === 'in_progress').length,
    review: taskStore.tasks.filter(t => t.status === 'review').length,
    done: taskStore.tasks.filter(t => t.status === 'done').length
  };

  return [
    {
      id: 'backlog',
      label: 'Backlog',
      count: counts.backlog,
      percent: Math.round((counts.backlog / total) * 100),
      colorClass: 'bg-slate-400',
      barColorClass: 'bg-slate-400'
    },
    {
      id: 'todo',
      label: 'To Do',
      count: counts.todo,
      percent: Math.round((counts.todo / total) * 100),
      colorClass: 'bg-blue-500',
      barColorClass: 'bg-blue-500'
    },
    {
      id: 'in_progress',
      label: 'In Progress',
      count: counts.in_progress,
      percent: Math.round((counts.in_progress / total) * 100),
      colorClass: 'bg-amber-500',
      barColorClass: 'bg-amber-500'
    },
    {
      id: 'review',
      label: 'In Review',
      count: counts.review,
      percent: Math.round((counts.review / total) * 100),
      colorClass: 'bg-purple-500',
      barColorClass: 'bg-purple-500'
    },
    {
      id: 'done',
      label: 'Completed',
      count: counts.done,
      percent: Math.round((counts.done / total) * 100),
      colorClass: 'bg-emerald-500',
      barColorClass: 'bg-emerald-500'
    }
  ];
});
</script>

