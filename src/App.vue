<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-150">
    <!-- Navbar -->
    <Navbar @toggle-theme="toggleTheme">
      <template #theme-icon>
        <span v-if="isDark">☀️</span>
        <span v-else>🌙</span>
      </template>
    </Navbar>

    <!-- Content (Board or List) -->
    <main class="flex-1">
      <KanbanBoard v-if="store.activeView === 'board'" />
      <ListView v-else />
    </main>

    <!-- Task Create / Edit Modal -->
    <TaskModal />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import Navbar from '@/components/Navbar.vue';
import KanbanBoard from '@/components/KanbanBoard.vue';
import ListView from '@/components/ListView.vue';
import TaskModal from '@/components/TaskModal.vue';

const store = useTaskStore();
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  applyTheme();
};

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('taskflow_theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('taskflow_theme', 'light');
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem('taskflow_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark);
  applyTheme();
});
</script>
