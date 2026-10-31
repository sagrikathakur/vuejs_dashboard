<template>
  <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <!-- Left: Title & Views -->
      <div class="flex items-center gap-6">
        <h1 class="font-semibold text-base text-gray-900 dark:text-gray-100">
          Tasks
        </h1>

        <!-- View Switcher -->
        <nav class="flex items-center gap-1 text-sm">
          <button
            @click="store.activeView = 'board'"
            :class="[
              'px-2.5 py-1 rounded transition-colors',
              store.activeView === 'board'
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            ]"
          >
            Board
          </button>
          <button
            @click="store.activeView = 'list'"
            :class="[
              'px-2.5 py-1 rounded transition-colors',
              store.activeView === 'list'
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
            ]"
          >
            List
          </button>
        </nav>
      </div>

      <!-- Right: Search, Filter, Theme, Add -->
      <div class="flex items-center gap-2">
        <!-- Search input -->
        <input
          v-model="store.searchQuery"
          type="text"
          placeholder="Filter..."
          class="w-36 sm:w-48 px-2.5 py-1 text-sm rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-gray-400"
        />

        <!-- Priority Filter -->
        <select
          v-model="store.selectedPriority"
          class="px-2 py-1 text-sm rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Med</option>
          <option value="low">Low</option>
        </select>

        <!-- Dark/Light toggle -->
        <button
          @click="$emit('toggle-theme')"
          class="p-1.5 rounded text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          title="Toggle theme"
        >
          <slot name="theme-icon" />
        </button>

        <!-- New Task Button -->
        <button
          @click="store.openCreateModal()"
          class="px-3 py-1 text-sm font-medium rounded bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white transition-colors"
        >
          + Add
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useTaskStore } from '@/stores/taskStore';

defineEmits(['toggle-theme']);
const store = useTaskStore();
</script>

