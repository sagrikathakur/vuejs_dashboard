<template>
  <div class="max-w-6xl mx-auto px-6 py-6">
    <div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
      <div v-if="store.filteredTasks.length === 0" class="p-8 text-center text-sm text-gray-400">
        No tasks found.
      </div>

      <div
        v-for="task in store.filteredTasks"
        :key="task.id"
        class="flex items-center justify-between gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <!-- Left: Checkbox + Title -->
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <input
            type="checkbox"
            :checked="task.status === 'done'"
            @change="toggleDone(task)"
            class="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 focus:ring-0 cursor-pointer"
          />

          <div class="min-w-0 flex-1">
            <span
              :class="[
                'text-sm font-medium',
                task.status === 'done'
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-900 dark:text-gray-100'
              ]"
            >
              {{ task.title }}
            </span>
            <span v-if="task.description" class="hidden sm:inline text-xs text-gray-400 ml-2">
              — {{ task.description }}
            </span>
          </div>
        </div>

        <!-- Right: Status, Priority, Due Date, Actions -->
        <div class="flex items-center gap-3 text-xs shrink-0">
          <!-- Status select -->
          <select
            :value="task.status"
            @change="store.moveTask(task.id, $event.target.value)"
            class="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <!-- Priority -->
          <span
            v-if="task.priority === 'high'"
            class="text-red-600 dark:text-red-400 font-medium w-8 text-center"
          >
            High
          </span>
          <span
            v-else-if="task.priority === 'medium'"
            class="text-amber-600 dark:text-amber-400 w-8 text-center"
          >
            Med
          </span>
          <span v-else class="text-gray-400 w-8 text-center">Low</span>

          <!-- Due Date -->
          <span v-if="task.dueDate" class="text-gray-400 w-14 text-right">
            {{ formatDate(task.dueDate) }}
          </span>

          <!-- Action buttons -->
          <div class="flex items-center gap-1.5 ml-2 text-gray-400">
            <button
              @click="store.openEditModal(task)"
              class="hover:text-gray-700 dark:hover:text-gray-200"
            >
              Edit
            </button>
            <span>·</span>
            <button
              @click="store.deleteTask(task.id)"
              class="hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';

const store = useTaskStore();

const toggleDone = (task) => {
  store.moveTask(task.id, task.status === 'done' ? 'todo' : 'done');
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
</script>

