<template>
  <div
    draggable="true"
    @dragstart="handleDragStart"
    @click="taskStore.openTaskDetail(task.id)"
    class="group relative bg-white dark:bg-slate-800/90 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-150 cursor-pointer select-none"
  >
    <!-- Top row: ID, Priority, points -->
    <div class="flex items-center justify-between gap-2 mb-2">
      <div class="flex items-center gap-2">
        <span class="font-mono text-[11px] font-semibold text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {{ task.id }}
        </span>
        <StatusBadge type="priority" :value="task.priority" />
      </div>

      <!-- Story points badge -->
      <span
        v-if="task.points"
        class="inline-flex items-center justify-center w-5 h-5 rounded text-[11px] font-mono font-semibold bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
        title="Story Points"
      >
        {{ task.points }}
      </span>
    </div>

    <!-- Title -->
    <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100 line-clamp-2 leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
      {{ task.title }}
    </h3>

    <!-- Tags / Labels -->
    <div v-if="task.labels && task.labels.length" class="flex flex-wrap gap-1.5 mb-3">
      <span
        v-for="label in task.labels"
        :key="label"
        class="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-700/60 dark:text-slate-300"
      >
        {{ label }}
      </span>
    </div>

    <!-- Bottom row: Subtasks count, Due Date & Assignee Avatar -->
    <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/50 text-xs text-slate-400">
      <div class="flex items-center gap-3">
        <!-- Subtasks indicator -->
        <div
          v-if="task.subtasks && task.subtasks.length"
          class="flex items-center gap-1"
          :class="completedSubtasksCount === task.subtasks.length ? 'text-emerald-600 dark:text-emerald-400 font-medium' : ''"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span class="text-[11px] font-mono">{{ completedSubtasksCount }}/{{ task.subtasks.length }}</span>
        </div>

        <!-- Comments indicator -->
        <div v-if="task.comments && task.comments.length" class="flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span class="text-[11px] font-mono">{{ task.comments.length }}</span>
        </div>

        <!-- Due Date -->
        <div v-if="task.dueDate" class="flex items-center gap-1 text-[11px]">
          <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{{ formatDate(task.dueDate) }}</span>
        </div>
      </div>

      <!-- Assignee Avatar -->
      <img
        :src="assignee.avatar"
        :alt="assignee.name"
        :title="assignee.name"
        class="w-6 h-6 rounded-full ring-1 ring-slate-200 dark:ring-slate-700 object-cover"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTaskStore } from '@/stores/useTaskStore';
import { useTeamStore } from '@/stores/useTeamStore';
import { formatDate } from '@/utils/formatters';
import StatusBadge from '@/components/common/StatusBadge.vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const taskStore = useTaskStore();
const teamStore = useTeamStore();

const assignee = computed(() => {
  return teamStore.getMemberById(props.task.assigneeId);
});

const completedSubtasksCount = computed(() => {
  return (props.task.subtasks || []).filter(s => s.completed).length;
});

const handleDragStart = (e) => {
  e.dataTransfer.setData('text/plain', props.task.id);
  e.dataTransfer.effectAllowed = 'move';
};
</script>

