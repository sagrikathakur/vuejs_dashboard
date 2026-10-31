import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const STORAGE_KEY = 'tasks_app_data';

const initialTasks = [
  {
    id: '1',
    title: 'Redesign landing page hero',
    description: 'Simplify headline and test on mobile screens.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-11-05'
  },
  {
    id: '2',
    title: 'Fix authentication session timeout bug',
    description: 'Ensure token refresh triggers before 401 on background tabs.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-11-03'
  },
  {
    id: '3',
    title: 'Write REST API documentation for checkout',
    description: 'Document endpoints and schemas in Markdown.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-11-08'
  },
  {
    id: '4',
    title: 'Migrate user settings to PostgreSQL',
    description: 'Draft migration script and test rollback plan in staging.',
    status: 'in_progress',
    priority: 'medium',
    dueDate: '2026-11-06'
  },
  {
    id: '5',
    title: 'Update Stripe billing webhook handlers',
    description: 'Handle customer.subscription.deleted events.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-10-30'
  },
  {
    id: '6',
    title: 'Audit accessibility of navigation menu',
    description: 'Check keyboard tab order, ARIA attributes, and contrast.',
    status: 'done',
    priority: 'low',
    dueDate: '2026-10-28'
  }
];

export const useTaskStore = defineStore('tasks', () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const tasks = ref(saved ? JSON.parse(saved) : initialTasks);

  const activeView = ref('board');
  const searchQuery = ref('');
  const selectedPriority = ref('all');

  const isModalOpen = ref(false);
  const taskToEdit = ref(null);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
  };

  const filteredTasks = computed(() => {
    const q = searchQuery.value.trim().toLowerCase();
    return tasks.value.filter(t => {
      const matchesSearch = !q || t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q);
      const matchesPriority = selectedPriority.value === 'all' || t.priority === selectedPriority.value;
      return matchesSearch && matchesPriority;
    });
  });

  const tasksByStatus = computed(() => ({
    todo: filteredTasks.value.filter(t => t.status === 'todo'),
    in_progress: filteredTasks.value.filter(t => t.status === 'in_progress'),
    done: filteredTasks.value.filter(t => t.status === 'done')
  }));

  function addTask(taskData) {
    tasks.value.unshift({
      id: Date.now().toString(),
      title: taskData.title.trim(),
      description: taskData.description?.trim() || '',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || ''
    });
    save();
  }

  function updateTask(id, updates) {
    const index = tasks.value.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates };
      save();
    }
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id);
    save();
  }

  function moveTask(id, newStatus) {
    const task = tasks.value.find(t => t.id === id);
    if (task && task.status !== newStatus) {
      task.status = newStatus;
      save();
    }
  }

  function openCreateModal(defaultStatus = 'todo') {
    taskToEdit.value = { status: defaultStatus, priority: 'medium' };
    isModalOpen.value = true;
  }

  function openEditModal(task) {
    taskToEdit.value = { ...task };
    isModalOpen.value = true;
  }

  function closeModal() {
    isModalOpen.value = false;
    taskToEdit.value = null;
  }

  return {
    tasks,
    activeView,
    searchQuery,
    selectedPriority,
    isModalOpen,
    taskToEdit,
    filteredTasks,
    tasksByStatus,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    openCreateModal,
    openEditModal,
    closeModal
  };
});

