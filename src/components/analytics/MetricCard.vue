<template>
  <div class="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {{ title }}
      </span>
      <div :class="['w-8 h-8 rounded-xl flex items-center justify-center', iconBgClass]">
        <slot name="icon" />
      </div>
    </div>

    <div class="flex items-baseline gap-2 mb-1">
      <span class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {{ value }}
      </span>
      <span
        v-if="change"
        :class="[
          'text-xs font-semibold flex items-center gap-0.5',
          isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
        ]"
      >
        <span>{{ isPositive ? '↑' : '↓' }}</span>
        <span>{{ change }}</span>
      </span>
    </div>

    <p v-if="subtitle" class="text-xs text-slate-500 dark:text-slate-400">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  change: {
    type: String,
    default: ''
  },
  isPositive: {
    type: Boolean,
    default: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  iconBgClass: {
    type: String,
    default: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
  }
});
</script>

