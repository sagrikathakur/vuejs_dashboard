<template>
  <div class="p-8 max-w-7xl mx-auto space-y-8 overflow-y-auto h-full">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Sprint Intelligence & Velocity
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Real-time metrics, burndown projections, and engineering throughput for Sprint 34.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="taskStore.isCopilotModalOpen = true"
          class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition-colors flex items-center gap-2"
        >
          <span>✨</span>
          <span>Ask AI Copilot for Sprint Summary</span>
        </button>
        <button
          @click="taskStore.exportData"
          class="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs transition-colors flex items-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export Metrics</span>
        </button>
      </div>
    </div>

    <!-- 4 KPI Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- Velocity -->
      <MetricCard
        title="Sprint Velocity"
        :value="`${taskStore.metrics.velocity} pts`"
        change="+14.2%"
        :isPositive="true"
        subtitle="Completed vs previous sprint target"
        iconBgClass="bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400"
      >
        <template #icon>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </template>
      </MetricCard>

      <!-- Completion Rate -->
      <MetricCard
        title="Completion Rate"
        :value="`${taskStore.metrics.completionRate}%`"
        change="+5.0%"
        :isPositive="true"
        :subtitle="`${taskStore.metrics.completed} of ${taskStore.metrics.total} issues resolved`"
        iconBgClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
      >
        <template #icon>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </template>
      </MetricCard>

      <!-- Urgent Blockers -->
      <MetricCard
        title="Urgent Issues"
        :value="taskStore.metrics.urgent"
        change="2 resolved"
        :isPositive="taskStore.metrics.urgent === 0"
        subtitle="P0/P1 issues requiring priority"
        iconBgClass="bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400"
      >
        <template #icon>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </template>
      </MetricCard>

      <!-- Total Workload Points -->
      <MetricCard
        title="Total Sprint Points"
        :value="`${taskStore.metrics.totalPoints} pts`"
        change="94% allocated"
        :isPositive="true"
        subtitle="Across 5 active engineers"
        iconBgClass="bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400"
      >
        <template #icon>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </template>
      </MetricCard>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <VelocityChart />
      </div>
      <div>
        <DistributionChart />
      </div>
    </div>

    <!-- Audit Activity Stream -->
    <ActivityStream />
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/useTaskStore';
import MetricCard from '@/components/analytics/MetricCard.vue';
import VelocityChart from '@/components/analytics/VelocityChart.vue';
import DistributionChart from '@/components/analytics/DistributionChart.vue';
import ActivityStream from '@/components/analytics/ActivityStream.vue';

const taskStore = useTaskStore();
</script>

