<template>
  <div class="p-8 max-w-4xl mx-auto space-y-8 overflow-y-auto h-full">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        Workspace Settings & Configuration
      </h2>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Manage project persistence, data import/export, and workspace preferences.
      </p>
    </div>

    <!-- Appearance & Theme Section -->
    <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <h3 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
        <svg class="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
        <span>Appearance & Theme</span>
      </h3>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        Choose between sleek dark mode or high-contrast light mode with automatic system sync.
      </p>

      <div class="flex items-center gap-4 pt-2">
        <button
          @click="themeStore.setTheme('light')"
          :class="[
            'flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all',
            themeStore.currentTheme === 'light'
              ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400'
              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
          ]"
        >
          <span>☀️ Light Mode</span>
        </button>

        <button
          @click="themeStore.setTheme('dark')"
          :class="[
            'flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all',
            themeStore.currentTheme === 'dark'
              ? 'border-indigo-600 bg-indigo-950/60 text-indigo-400'
              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
          ]"
        >
          <span>🌙 Dark Mode</span>
        </button>
      </div>
    </div>

    <!-- Data Management (Export & Import) -->
    <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <h3 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
        <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        <span>Data Backup & Portability</span>
      </h3>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        All state is persistently synced to LocalStorage. You can export the state as JSON or restore anytime.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2">
        <button
          @click="taskStore.exportData"
          class="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all flex items-center gap-2"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export State as JSON</span>
        </button>

        <label
          class="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer shadow-xs transition-all flex items-center gap-2"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span>Import JSON State</span>
          <input type="file" accept=".json" @change="handleFileUpload" class="hidden" />
        </label>

        <button
          @click="handleReset"
          class="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition-colors ml-auto"
        >
          Reset to Sample Data
        </button>
      </div>
    </div>

    <!-- Architectural Overview & Portfolio Information -->
    <div class="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/60 space-y-3">
      <h3 class="font-bold text-sm text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
        <span>🚀 Portfolio Architecture & Tech Highlights</span>
      </h3>
      <div class="text-xs text-indigo-900/80 dark:text-indigo-300/80 space-y-2 leading-relaxed">
        <p>
          <strong>Framework & Reactivity:</strong> Vue 3 with Composition API (<code class="bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded">&lt;script setup&gt;</code>) for clean reactive code and zero boilerplate.
        </p>
        <p>
          <strong>State Management:</strong> Pinia stores with normalized state, reactive getters, and seamless <code class="bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded">localStorage</code> caching.
        </p>
        <p>
          <strong>Interactive Drag & Drop:</strong> Native HTML5 drag-and-drop API with drop indicators and immediate optimistic state updates.
        </p>
        <p>
          <strong>Keyboard-first UX:</strong> Global command palette (<code class="bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded">Cmd+K</code> / <code class="bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded">Ctrl+K</code>) for instant navigation and action triggering.
        </p>
        <p>
          <strong>AI Copilot Studio:</strong> Realistic streaming response simulation for automated subtask breakdown and release note generation.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/useThemeStore';
import { useTaskStore } from '@/stores/useTaskStore';
import { useNotificationStore } from '@/stores/useNotificationStore';

const themeStore = useThemeStore();
const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const handleFileUpload = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      taskStore.importData(event.target.result);
    } catch (err) {
      notificationStore.error('Import Error', 'Could not parse JSON file.');
    }
  };
  reader.readAsText(file);
};

const handleReset = () => {
  if (confirm('Are you sure you want to reset all tasks and activities to initial sample data?')) {
    taskStore.resetToDefaults();
  }
};
</script>

