<template>
  <div
    v-if="taskStore.isCommandPaletteOpen"
    class="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
    @click.self="taskStore.isCommandPaletteOpen = false"
  >
    <div
      class="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fade-in"
    >
      <!-- Search input -->
      <div class="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
        <svg class="w-5 h-5 text-slate-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          placeholder="Type a command or search issues by name or #id..."
          class="w-full py-4 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          @keydown.esc="taskStore.isCommandPaletteOpen = false"
        />
        <kbd class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-500">
          ESC
        </kbd>
      </div>

      <!-- Action items & results -->
      <div class="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
        <!-- Quick Actions -->
        <div class="pb-2">
          <div class="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Actions
          </div>
          <button
            @click="handleCreateIssue"
            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </span>
              <span>Create New Issue</span>
            </div>
            <kbd class="text-[10px] text-slate-400 font-mono">N</kbd>
          </button>

          <button
            @click="handleToggleTheme"
            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </span>
              <span>Toggle Dark / Light Mode</span>
            </div>
            <kbd class="text-[10px] text-slate-400 font-mono">T</kbd>
          </button>

          <button
            @click="handleOpenCopilot"
            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-md bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <span>Open AI Copilot Assistant</span>
            </div>
            <kbd class="text-[10px] text-slate-400 font-mono">A</kbd>
          </button>
        </div>

        <!-- Issue Search Results -->
        <div class="pt-2">
          <div class="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Issues ({{ searchResults.length }})
          </div>
          <div v-if="searchResults.length === 0" class="px-3 py-4 text-center text-xs text-slate-400">
            No matching issues found for "{{ query }}"
          </div>
          <button
            v-for="task in searchResults"
            :key="task.id"
            @click="handleSelectTask(task.id)"
            class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
          >
            <div class="flex items-center gap-2.5 min-w-0 pr-2">
              <span class="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 shrink-0">
                {{ task.id }}
              </span>
              <span class="text-sm text-slate-800 dark:text-slate-200 truncate">
                {{ task.title }}
              </span>
            </div>
            <StatusBadge type="priority" :value="task.priority" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useTaskStore } from '@/stores/useTaskStore';
import { useThemeStore } from '@/stores/useThemeStore';
import StatusBadge from './StatusBadge.vue';

const taskStore = useTaskStore();
const themeStore = useThemeStore();
const query = ref('');
const inputRef = ref(null);

watch(() => taskStore.isCommandPaletteOpen, async (isOpen) => {
  if (isOpen) {
    query.value = '';
    await nextTick();
    inputRef.value?.focus();
  }
});

const searchResults = computed(() => {
  if (!query.value.trim()) return taskStore.tasks.slice(0, 5);
  const q = query.value.toLowerCase();
  return taskStore.tasks.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.id.toLowerCase().includes(q) ||
    (t.description && t.description.toLowerCase().includes(q))
  );
});

const handleSelectTask = (id) => {
  taskStore.isCommandPaletteOpen = false;
  taskStore.openTaskDetail(id);
};

const handleCreateIssue = () => {
  taskStore.isCommandPaletteOpen = false;
  taskStore.isCreateModalOpen = true;
};

const handleToggleTheme = () => {
  themeStore.toggleTheme();
  taskStore.isCommandPaletteOpen = false;
};

const handleOpenCopilot = () => {
  taskStore.isCommandPaletteOpen = false;
  taskStore.isCopilotModalOpen = true;
};

// Global keydown handler for ⌘K or Ctrl+K
const handleKeyDown = (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    taskStore.isCommandPaletteOpen = !taskStore.isCommandPaletteOpen;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

