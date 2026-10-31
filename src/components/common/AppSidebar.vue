<template>
  <aside class="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0 select-none">
    <!-- Brand Logo -->
    <div class="h-16 px-6 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800">
      <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div>
        <div class="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
          <span>ZENITH</span>
          <span class="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">PRO</span>
        </div>
        <div class="text-[11px] text-slate-400 font-medium tracking-tight">Engineering Intelligence</div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-1.5 flex-1">
      <router-link
        to="/board"
        class="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="[
          $route.path === '/board'
            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
        ]"
      >
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          <span>Kanban Board</span>
        </div>
        <span class="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
          {{ taskStore.tasks.length }}
        </span>
      </router-link>

      <router-link
        to="/backlog"
        class="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="[
          $route.path === '/backlog'
            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
        ]"
      >
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <span>Backlog</span>
        </div>
      </router-link>

      <router-link
        to="/analytics"
        class="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="[
          $route.path === '/analytics'
            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
        ]"
      >
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span>Analytics & Velocity</span>
        </div>
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
      </router-link>

      <router-link
        to="/team"
        class="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="[
          $route.path === '/team'
            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
        ]"
      >
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span>Team & Workload</span>
        </div>
      </router-link>

      <router-link
        to="/settings"
        class="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors"
        :class="[
          $route.path === '/settings'
            ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
        ]"
      >
        <div class="flex items-center gap-3">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Workspace Settings</span>
        </div>
      </router-link>
    </nav>

    <!-- Mini Sprint Velocity Widget in Sidebar -->
    <div class="p-4 m-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800/80">
      <div class="flex items-center justify-between text-xs mb-1.5">
        <span class="font-medium text-slate-500 dark:text-slate-400">Sprint Completion</span>
        <span class="font-bold text-slate-900 dark:text-white">{{ taskStore.metrics.completionRate }}%</span>
      </div>
      <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
        <div
          class="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
          :style="{ width: `${taskStore.metrics.completionRate}%` }"
        ></div>
      </div>
      <div class="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
        <span>{{ taskStore.metrics.completedPoints }} / {{ taskStore.metrics.totalPoints }} pts</span>
        <span>{{ taskStore.metrics.urgent }} urgent</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useTaskStore } from '@/stores/useTaskStore';
const taskStore = useTaskStore();
</script>

