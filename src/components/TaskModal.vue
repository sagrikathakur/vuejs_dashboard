<template>
  <div
    v-if="store.isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
    @click.self="store.closeModal"
    @keydown.esc="store.closeModal"
  >
    <div class="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-5 space-y-4 shadow-md">
      <!-- Header -->
      <div class="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
        <h2 class="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {{ isEditing ? 'Edit Task' : 'New Task' }}
        </h2>
        <button
          @click="store.closeModal"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm"
        >
          ✕
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-3">
        <!-- Title -->
        <div>
          <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            v-model="form.title"
            type="text"
            required
            placeholder="e.g. Redesign navigation menu"
            class="w-full px-3 py-1.5 text-sm rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gray-400"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            v-model="form.description"
            rows="2"
            placeholder="Additional notes..."
            class="w-full px-3 py-1.5 text-sm rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-gray-400 resize-none"
          ></textarea>
        </div>

        <!-- Status & Priority & Due Date -->
        <div class="grid grid-cols-3 gap-2">
          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              v-model="form.status"
              class="w-full p-1.5 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
            <select
              v-model="form.priority"
              class="w-full p-1.5 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="low">Low</option>
              <option value="medium">Med</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
            <input
              v-model="form.dueDate"
              type="date"
              class="w-full p-1.5 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            @click="store.closeModal"
            class="px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-3 py-1.5 text-xs font-medium bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white rounded transition-colors"
          >
            {{ isEditing ? 'Save' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const store = useTaskStore();

const isEditing = computed(() => Boolean(store.taskToEdit?.id));

const form = reactive({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  dueDate: ''
});

watch(() => store.taskToEdit, (task) => {
  if (task) {
    form.title = task.title || '';
    form.description = task.description || '';
    form.status = task.status || 'todo';
    form.priority = task.priority || 'medium';
    form.dueDate = task.dueDate || '';
  }
}, { immediate: true });

const handleSubmit = () => {
  if (!form.title.trim()) return;

  if (isEditing.value) {
    store.updateTask(store.taskToEdit.id, {
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate
    });
  } else {
    store.addTask({
      title: form.title,
      description: form.description,
      status: form.status,
      priority: form.priority,
      dueDate: form.dueDate
    });
  }

  store.closeModal();
};
</script>

