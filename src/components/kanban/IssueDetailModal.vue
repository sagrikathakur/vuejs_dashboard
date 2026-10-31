<template>
  <div
    v-if="taskStore.selectedTask"
    class="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs transition-opacity"
    @click.self="taskStore.selectedTaskId = null"
  >
    <!-- Slide-over Drawer -->
    <div
      class="w-full max-w-2xl bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-fade-in"
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
          <span class="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {{ taskStore.selectedTask.id }}
          </span>
          <StatusBadge type="priority" :value="taskStore.selectedTask.priority" />
          <StatusBadge type="status" :value="taskStore.selectedTask.status" />
        </div>

        <div class="flex items-center gap-2">
          <!-- Delete button -->
          <button
            @click="handleDelete"
            class="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            title="Delete Issue"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>

          <!-- Close drawer -->
          <button
            @click="taskStore.selectedTaskId = null"
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Scrollable content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Title & Description Edit -->
        <div>
          <input
            v-model="editedTitle"
            @blur="saveTitle"
            type="text"
            class="w-full text-xl font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:outline-none pb-1 transition-all"
          />

          <textarea
            v-model="editedDescription"
            @blur="saveDescription"
            rows="3"
            placeholder="Add detailed markdown description or technical specs..."
            class="w-full mt-3 p-3 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
          ></textarea>
        </div>

        <!-- Metadata Grid (Status, Priority, Assignee, Points, Due Date) -->
        <div class="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs">
          <!-- Status Select -->
          <div>
            <label class="block font-semibold text-slate-500 dark:text-slate-400 mb-1">Status</label>
            <select
              :value="taskStore.selectedTask.status"
              @change="e => taskStore.updateTask(taskStore.selectedTask.id, { status: e.target.value })"
              class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="backlog">Backlog</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="review">In Review</option>
              <option value="done">Completed</option>
            </select>
          </div>

          <!-- Priority Select -->
          <div>
            <label class="block font-semibold text-slate-500 dark:text-slate-400 mb-1">Priority</label>
            <select
              :value="taskStore.selectedTask.priority"
              @change="e => taskStore.updateTask(taskStore.selectedTask.id, { priority: e.target.value })"
              class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <!-- Assignee Select -->
          <div>
            <label class="block font-semibold text-slate-500 dark:text-slate-400 mb-1">Assignee</label>
            <select
              :value="taskStore.selectedTask.assigneeId"
              @change="e => taskStore.updateTask(taskStore.selectedTask.id, { assigneeId: e.target.value })"
              class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option
                v-for="member in teamStore.members"
                :key="member.id"
                :value="member.id"
              >
                {{ member.name }} ({{ member.role }})
              </option>
            </select>
          </div>

          <!-- Story Points & Due Date -->
          <div class="flex items-center gap-2">
            <div class="flex-1">
              <label class="block font-semibold text-slate-500 dark:text-slate-400 mb-1">Points</label>
              <input
                type="number"
                min="1"
                max="34"
                :value="taskStore.selectedTask.points"
                @change="e => taskStore.updateTask(taskStore.selectedTask.id, { points: Number(e.target.value) })"
                class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono font-medium"
              />
            </div>
            <div class="flex-1">
              <label class="block font-semibold text-slate-500 dark:text-slate-400 mb-1">Due Date</label>
              <input
                type="date"
                :value="taskStore.selectedTask.dueDate"
                @change="e => taskStore.updateTask(taskStore.selectedTask.id, { dueDate: e.target.value })"
                class="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs"
              />
            </div>
          </div>
        </div>

        <!-- Subtasks Checklist Section -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200">Subtask Checklist</h4>
              <span class="text-xs text-slate-500 font-mono">
                {{ completedCount }}/{{ totalSubtasks }} ({{ progressPercent }}%)
              </span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div
              class="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${progressPercent}%` }"
            ></div>
          </div>

          <!-- Subtasks List -->
          <div class="space-y-2 mb-3">
            <div
              v-for="subtask in taskStore.selectedTask.subtasks || []"
              :key="subtask.id"
              class="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 group"
            >
              <label class="flex items-center gap-2.5 flex-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  :checked="subtask.completed"
                  @change="taskStore.toggleSubtask(taskStore.selectedTask.id, subtask.id)"
                  class="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span
                  class="text-xs text-slate-800 dark:text-slate-200 transition-all"
                  :class="{ 'line-through text-slate-400 dark:text-slate-500': subtask.completed }"
                >
                  {{ subtask.title }}
                </span>
              </label>
            </div>
          </div>

          <!-- Add new subtask input -->
          <div class="flex items-center gap-2">
            <input
              v-model="newSubtaskTitle"
              type="text"
              placeholder="Add subtask and press enter..."
              @keydown.enter.prevent="handleAddSubtask"
              class="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              @click="handleAddSubtask"
              class="px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        <!-- Comments & Discussion -->
        <div class="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">Activity & Discussion</h4>

          <!-- Existing comments -->
          <div class="space-y-3 mb-4">
            <div
              v-for="comment in taskStore.selectedTask.comments || []"
              :key="comment.id"
              class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60"
            >
              <img
                :src="teamStore.getMemberById(comment.authorId).avatar"
                class="w-7 h-7 rounded-full object-cover shrink-0"
              />
              <div class="flex-1 text-xs">
                <div class="flex items-center justify-between mb-1">
                  <span class="font-bold text-slate-900 dark:text-white">
                    {{ teamStore.getMemberById(comment.authorId).name }}
                  </span>
                  <span class="text-[11px] text-slate-400">
                    {{ formatRelativeTime(comment.createdAt) }}
                  </span>
                </div>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ comment.text }}</p>
              </div>
            </div>
          </div>

          <!-- Add comment input -->
          <div class="flex items-start gap-2">
            <textarea
              v-model="newCommentText"
              rows="2"
              placeholder="Leave a message or engineering update..."
              class="flex-1 p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            ></textarea>
            <button
              @click="handleAddComment"
              class="px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-all shrink-0 self-end"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useTaskStore } from '@/stores/useTaskStore';
import { useTeamStore } from '@/stores/useTeamStore';
import { formatRelativeTime } from '@/utils/formatters';
import StatusBadge from '@/components/common/StatusBadge.vue';

const taskStore = useTaskStore();
const teamStore = useTeamStore();

const editedTitle = ref('');
const editedDescription = ref('');
const newSubtaskTitle = ref('');
const newCommentText = ref('');

watch(() => taskStore.selectedTask, (task) => {
  if (task) {
    editedTitle.value = task.title;
    editedDescription.value = task.description || '';
  }
}, { immediate: true });

const saveTitle = () => {
  if (taskStore.selectedTask && editedTitle.value.trim()) {
    taskStore.updateTask(taskStore.selectedTask.id, { title: editedTitle.value.trim() });
  }
};

const saveDescription = () => {
  if (taskStore.selectedTask) {
    taskStore.updateTask(taskStore.selectedTask.id, { description: editedDescription.value.trim() });
  }
};

const totalSubtasks = computed(() => (taskStore.selectedTask?.subtasks || []).length);
const completedCount = computed(() => (taskStore.selectedTask?.subtasks || []).filter(s => s.completed).length);
const progressPercent = computed(() => {
  if (totalSubtasks.value === 0) return 0;
  return Math.round((completedCount.value / totalSubtasks.value) * 100);
});

const handleAddSubtask = () => {
  if (!newSubtaskTitle.value.trim() || !taskStore.selectedTask) return;
  taskStore.addSubtask(taskStore.selectedTask.id, newSubtaskTitle.value);
  newSubtaskTitle.value = '';
};

const handleAddComment = () => {
  if (!newCommentText.value.trim() || !taskStore.selectedTask) return;
  taskStore.addComment(taskStore.selectedTask.id, 'user-1', newCommentText.value);
  newCommentText.value = '';
};

const handleDelete = () => {
  if (taskStore.selectedTask && confirm(`Are you sure you want to delete ${taskStore.selectedTask.id}?`)) {
    taskStore.deleteTask(taskStore.selectedTask.id);
  }
};
</script>

