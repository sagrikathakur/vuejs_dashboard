<template>
  <header class="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
    <!-- Left: Title & Sprint Meta -->
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <h1 class="font-bold text-slate-900 dark:text-white text-base tracking-tight">
          Sprint 34: Orion
        </h1>
      </div>
      <span class="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
        4 days left
      </span>
      <div class="hidden md:flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1.5 pl-2 border-l border-slate-200 dark:border-slate-800">
        <span>Target:</span>
        <span class="font-semibold text-slate-700 dark:text-slate-300">v2.4.0 Release</span>
      </div>
    </div>

    <!-- Right: Quick actions, Search trigger, AI, Theme, Profile -->
    <div class="flex items-center gap-2.5">
      <!-- Search / Command Palette shortcut trigger -->
      <button
        @click="taskStore.isCommandPaletteOpen = true"
        class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search or Jump...</span>
        <kbd class="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-mono text-[10px] text-slate-600 dark:text-slate-300">
          ⌘K
        </kbd>
      </button>

      <!-- AI Copilot Button -->
      <button
        @click="taskStore.isCopilotModalOpen = true"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-sm shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>AI Copilot</span>
      </button>

      <!-- Quick New Task Button -->
      <button
        @click="taskStore.isCreateModalOpen = true"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white shadow-sm transition-all"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span class="hidden sm:inline">New Issue</span>
      </button>

      <!-- Theme Switcher -->
      <button
        @click="themeStore.toggleTheme"
        class="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        title="Toggle Theme"
      >
        <!-- Sun icon -->
        <svg
          v-if="themeStore.currentTheme === 'dark'"
          class="w-4 h-4 text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <!-- Moon icon -->
        <svg
          v-else
          class="w-4 h-4 text-slate-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>

      <!-- Profile Avatar -->
      <div class="flex items-center pl-2 border-l border-slate-200 dark:border-slate-800">
        <img
          class="w-8 h-8 rounded-full ring-2 ring-indigo-500/30 object-cover"
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
          alt="Alex Rivera"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useTaskStore } from '@/stores/useTaskStore';
import { useThemeStore } from '@/stores/useThemeStore';

const taskStore = useTaskStore();
const themeStore = useThemeStore();
</script>

