<template>
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-bold text-sm text-slate-900 dark:text-white">Live Engineering Audit Trail</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">Chronological activity across repositories and sprints</p>
      </div>
      <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        Streaming
      </span>
    </div>

    <!-- Activity list -->
    <div class="space-y-3.5 flex-1 overflow-y-auto max-h-96 pr-1">
      <div
        v-for="item in taskStore.activities"
        :key="item.id"
        class="flex items-start gap-3 text-xs"
      >
        <img
          :src="getUser(item.userId).avatar"
          :alt="getUser(item.userId).name"
          class="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0 mt-0.5"
        />

        <div class="flex-1 min-w-0">
          <p class="text-slate-800 dark:text-slate-200 leading-snug">
            <strong class="font-bold text-slate-900 dark:text-white">{{ getUser(item.userId).name }}</strong>
            <span class="text-slate-500 dark:text-slate-400"> {{ item.action }} </span>
            <span class="font-mono font-medium text-indigo-600 dark:text-indigo-400">{{ item.target }}</span>
          </p>
          <span class="text-[10px] text-slate-400 mt-0.5 block font-mono">{{ item.timestamp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/useTaskStore';
import { useTeamStore } from '@/stores/useTeamStore';

const taskStore = useTaskStore();
const teamStore = useTeamStore();

const getUser = (id) => teamStore.getMemberById(id);
</script>

