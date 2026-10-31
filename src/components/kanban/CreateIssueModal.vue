<template>
  <div
    v-if="taskStore.isCreateModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
    @click.self="taskStore.isCreateModalOpen = false"
  >
    <div
      class="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in"
    >
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-indigo-600"></span>
          <h2 class="font-bold text-base text-slate-900 dark:text-white">Create New Engineering Issue</h2>
        </div>
        <button
          @click="taskStore.isCreateModalOpen = false"
          class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Form Body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
        <!-- Title Input -->
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Issue Title <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="formData.title"
            type="text"
            required
            placeholder="e.g. Implement Webhook retry exponential backoff mechanism"
            class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
          />
        </div>

        <!-- Description Input -->
        <div>
          <label class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Technical Description / Context
          </label>
          <textarea
            v-model="formData.description"
            rows="3"
            placeholder="Detail the expected behavior, API specs, or acceptance criteria..."
            class="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all resize-none"
          ></textarea>
        </div>

        <!-- Grid of Columns, Priority, Assignee, Points -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Column</label>
            <select
              v-model="formData.status"
              class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="backlog">Backlog</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="review">In Review</option>
              <option value="done">Completed</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Priority</label>
            <select
              v-model="formData.priority"
              class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Assignee</label>
            <select
              v-model="formData.assigneeId"
              class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              <option
                v-for="member in teamStore.members"
                :key="member.id"
                :value="member.id"
              >
                {{ member.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Story Pts</label>
            <select
              v-model.number="formData.points"
              class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono"
            >
              <option :value="1">1 pt</option>
              <option :value="2">2 pts</option>
              <option :value="3">3 pts</option>
              <option :value="5">5 pts</option>
              <option :value="8">8 pts</option>
              <option :value="13">13 pts</option>
            </select>
          </div>
        </div>

        <!-- Tags & Due Date -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Labels (comma separated)</label>
            <input
              v-model="rawLabels"
              type="text"
              placeholder="Backend, API, Performance"
              class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label class="block font-semibold text-slate-600 dark:text-slate-400 mb-1">Target Due Date</label>
            <input
              v-model="formData.dueDate"
              type="date"
              class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        <!-- Footer / Action Buttons -->
        <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            @click="taskStore.isCreateModalOpen = false"
            class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
          >
            Create Issue
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useTaskStore } from '@/stores/useTaskStore';
import { useTeamStore } from '@/stores/useTeamStore';

const taskStore = useTaskStore();
const teamStore = useTeamStore();

const rawLabels = ref('Feature, Frontend');

const formData = reactive({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assigneeId: 'user-1',
  points: 3,
  dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
});

const handleSubmit = () => {
  if (!formData.title.trim()) return;

  const parsedLabels = rawLabels.value
    .split(',')
    .map(l => l.trim())
    .filter(Boolean);

  taskStore.createTask({
    title: formData.title.trim(),
    description: formData.description.trim(),
    status: formData.status,
    priority: formData.priority,
    assigneeId: formData.assigneeId,
    points: formData.points,
    dueDate: formData.dueDate,
    labels: parsedLabels
  });

  // Reset form
  formData.title = '';
  formData.description = '';
  taskStore.isCreateModalOpen = false;
};
</script>

