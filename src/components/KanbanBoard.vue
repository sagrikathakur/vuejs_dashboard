<template>
  <div class="max-w-6xl mx-auto px-6 py-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <div
        v-for="col in columns"
        :key="col.id"
        class="bg-gray-50 dark:bg-gray-900/60 rounded-lg p-3 border border-gray-200 dark:border-gray-800"
        @dragover.prevent
        @drop="handleDrop($event, col.id)"
      >
        <!-- Column Header -->
        <div class="flex items-center justify-between pb-2 mb-2 border-b border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
          <div class="flex items-center gap-1.5">
            <span>{{ col.label }}</span>
            <span class="text-xs text-gray-400">({{ store.tasksByStatus[col.id]?.length || 0 }})</span>
          </div>

          <button
            @click="store.openCreateModal(col.id)"
            class="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            title="Add task"
          >
            + Add
          </button>
        </div>

        <!-- Cards -->
        <div class="space-y-2 min-h-[120px]">
          <div
            v-for="task in store.tasksByStatus[col.id]"
            :key="task.id"
            draggable="true"
            @dragstart="handleDragStart($event, task.id)"
            class="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-grab active:cursor-grabbing"
          >
            <!-- Title -->
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ task.title }}
            </p>

            <!-- Description -->
            <p v-if="task.description" class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-normal">
              {{ task.description }}
            </p>

            <!-- Card Footer -->
            <div class="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs text-gray-400">
              <div class="flex items-center gap-2">
                <span
                  v-if="task.priority === 'high'"
                  class="text-red-600 dark:text-red-400 font-medium"
                >
                  High
                </span>
                <span
                  v-else-if="task.priority === 'medium'"
                  class="text-amber-600 dark:text-amber-400"
                >
                  Med
                </span>
                <span v-else class="text-gray-400">Low</span>

                <span v-if="task.dueDate">· {{ formatDate(task.dueDate) }}</span>
              </div>

              <!-- Action links -->
              <div class="flex items-center gap-2">
                <button
                  @click="store.openEditModal(task)"
                  class="hover:text-gray-700 dark:hover:text-gray-200"
                >
                  Edit
                </button>
                <button
                  @click="store.deleteTask(task.id)"
                  class="hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <!-- Empty placeholder -->
          <div
            v-if="!store.tasksByStatus[col.id]?.length"
            class="py-8 text-center text-xs text-gray-400"
          >
            No tasks
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';

const store = useTaskStore();

const columns = [
  { id: 'todo', label: 'To Do' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'done', label: 'Done' }
];

const handleDragStart = (e, taskId) => {
  e.dataTransfer.setData('text/plain', taskId);
  e.dataTransfer.effectAllowed = 'move';
};

const handleDrop = (e, colId) => {
  const taskId = e.dataTransfer.getData('text/plain');
  if (taskId) {
    store.moveTask(taskId, colId);
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
</script>

