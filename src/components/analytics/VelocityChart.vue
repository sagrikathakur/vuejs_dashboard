<template>
  <div class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="font-bold text-sm text-slate-900 dark:text-white">Sprint Velocity & Burnup Trends</h3>
        <p class="text-xs text-slate-500 dark:text-slate-400">Story points committed vs completed over recent iterations</p>
      </div>

      <div class="flex items-center gap-4 text-xs font-medium">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-sm bg-indigo-500"></span>
          <span class="text-slate-600 dark:text-slate-300">Completed Pts</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-sm bg-slate-300 dark:bg-slate-700"></span>
          <span class="text-slate-600 dark:text-slate-300">Committed Pts</span>
        </div>
      </div>
    </div>

    <!-- Interactive SVG Chart -->
    <div class="relative w-full h-64 select-none">
      <svg class="w-full h-full overflow-visible" viewBox="0 0 500 200">
        <!-- Horizontal Guide Lines -->
        <line x1="40" y1="20" x2="480" y2="20" stroke="currentColor" class="text-slate-100 dark:text-slate-800" stroke-dasharray="4 4" />
        <line x1="40" y1="70" x2="480" y2="70" stroke="currentColor" class="text-slate-100 dark:text-slate-800" stroke-dasharray="4 4" />
        <line x1="40" y1="120" x2="480" y2="120" stroke="currentColor" class="text-slate-100 dark:text-slate-800" stroke-dasharray="4 4" />
        <line x1="40" y1="170" x2="480" y2="170" stroke="currentColor" class="text-slate-200 dark:text-slate-700" />

        <!-- Y Axis Labels -->
        <text x="25" y="24" class="text-[10px] fill-slate-400 font-mono" text-anchor="end">40</text>
        <text x="25" y="74" class="text-[10px] fill-slate-400 font-mono" text-anchor="end">30</text>
        <text x="25" y="124" class="text-[10px] fill-slate-400 font-mono" text-anchor="end">20</text>
        <text x="25" y="174" class="text-[10px] fill-slate-400 font-mono" text-anchor="end">0</text>

        <!-- Sprints Data Bars -->
        <g v-for="(sprint, i) in sprintHistory" :key="sprint.name">
          <!-- X position calculation -->
          <!-- Base X: 75 + i * 90 -->
          <!-- Committed Bar (Gray) -->
          <rect
            :x="75 + i * 85"
            :y="170 - (sprint.committed / 45) * 150"
            width="22"
            :height="(sprint.committed / 45) * 150"
            rx="4"
            class="fill-slate-200 dark:fill-slate-700/80 transition-all duration-300"
          />

          <!-- Completed Bar (Indigo) -->
          <rect
            :x="100 + i * 85"
            :y="170 - (sprint.completed / 45) * 150"
            width="22"
            :height="(sprint.completed / 45) * 150"
            rx="4"
            class="fill-indigo-500 hover:fill-indigo-600 dark:fill-indigo-600 dark:hover:fill-indigo-500 transition-all duration-300 cursor-pointer"
            @mouseenter="activeTooltip = sprint"
            @mouseleave="activeTooltip = null"
          />

          <!-- Sprint Name Label -->
          <text
            :x="98 + i * 85"
            y="190"
            class="text-[11px] fill-slate-500 dark:fill-slate-400 font-medium"
            text-anchor="middle"
          >
            {{ sprint.name }}
          </text>
        </g>
      </svg>

      <!-- Hover Tooltip -->
      <div
        v-if="activeTooltip"
        class="absolute top-2 right-4 px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs shadow-lg font-mono pointer-events-none animate-fade-in"
      >
        <strong>{{ activeTooltip.name }}</strong>: {{ activeTooltip.completed }}/{{ activeTooltip.committed }} pts ({{ Math.round((activeTooltip.completed/activeTooltip.committed)*100) }}%)
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTooltip = ref(null);

const sprintHistory = [
  { name: 'Sprint 30', committed: 32, completed: 30 },
  { name: 'Sprint 31', committed: 35, completed: 34 },
  { name: 'Sprint 32', committed: 40, completed: 38 },
  { name: 'Sprint 33', committed: 36, completed: 35 },
  { name: 'Sprint 34', committed: 34, completed: 26 } // Current sprint
];
</script>

