<template>
  <div class="p-8 max-w-7xl mx-auto space-y-8 overflow-y-auto h-full">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Engineering Team & Workload Capacity
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor squad bandwidth, active issue allocation, and sprint availability.
        </p>
      </div>

      <button
        @click="isInviteOpen = true"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all self-start sm:self-auto"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        <span>Add Teammate</span>
      </button>
    </div>

    <!-- Team Member Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="member in teamStore.members"
        :key="member.id"
        class="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
      >
        <div>
          <!-- Avatar, Name & Status -->
          <div class="flex items-start gap-4 mb-4">
            <div class="relative">
              <img
                :src="member.avatar"
                :alt="member.name"
                class="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 shadow-sm"
              />
              <span
                :class="[
                  'absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white dark:ring-slate-900',
                  member.status === 'online' ? 'bg-emerald-500' : member.status === 'in-meeting' ? 'bg-amber-500' : 'bg-slate-400'
                ]"
                :title="member.status"
              ></span>
            </div>

            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-sm text-slate-900 dark:text-white truncate">
                {{ member.name }}
              </h3>
              <p class="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                {{ member.role }}
              </p>
              <p class="text-[11px] text-slate-400 truncate mt-0.5">
                {{ member.email }}
              </p>
            </div>
          </div>

          <!-- Capacity Bar -->
          <div class="space-y-1.5 mb-4">
            <div class="flex justify-between text-xs font-medium">
              <span class="text-slate-500 dark:text-slate-400">Weekly Bandwidth</span>
              <span class="font-mono text-slate-800 dark:text-slate-200">
                {{ member.allocated }} / {{ member.capacity }} hrs ({{ Math.round((member.allocated / member.capacity) * 100) }}%)
              </span>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                :class="[
                  'h-2 rounded-full transition-all duration-300',
                  member.allocated >= member.capacity ? 'bg-rose-500' : member.allocated > 30 ? 'bg-amber-500' : 'bg-indigo-500'
                ]"
                :style="{ width: `${Math.min(100, Math.round((member.allocated / member.capacity) * 100))}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Assigned Tasks Summary -->
        <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Active Issues:</span>
          <span class="font-bold text-slate-900 dark:text-white font-mono">
            {{ getMemberTasksCount(member.id) }} tasks
          </span>
        </div>
      </div>
    </div>

    <!-- Simple Add Member Modal -->
    <div
      v-if="isInviteOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      @click.self="isInviteOpen = false"
    >
      <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 class="font-bold text-base text-slate-900 dark:text-white">Add Engineering Teammate</h3>
        <div class="space-y-3 text-xs">
          <div>
            <label class="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              v-model="newMemberName"
              type="text"
              placeholder="e.g. Jordan Miller"
              class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label class="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Engineering Role</label>
            <input
              v-model="newMemberRole"
              type="text"
              placeholder="e.g. Senior Security Specialist"
              class="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>
        <div class="flex justify-end gap-2 pt-2">
          <button
            @click="isInviteOpen = false"
            class="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400"
          >
            Cancel
          </button>
          <button
            @click="saveNewMember"
            class="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white"
          >
            Save Member
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTeamStore } from '@/stores/useTeamStore';
import { useTaskStore } from '@/stores/useTaskStore';
import { useNotificationStore } from '@/stores/useNotificationStore';

const teamStore = useTeamStore();
const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const isInviteOpen = ref(false);
const newMemberName = ref('');
const newMemberRole = ref('');

const getMemberTasksCount = (memberId) => {
  return taskStore.tasks.filter(t => t.assigneeId === memberId && t.status !== 'done').length;
};

const saveNewMember = () => {
  if (!newMemberName.value.trim()) return;
  teamStore.addMember({
    name: newMemberName.value.trim(),
    role: newMemberRole.value.trim() || 'Software Engineer',
    email: `${newMemberName.value.toLowerCase().replace(/\s+/g, '.')}@zenith.dev`,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
    capacity: 40,
    allocated: 15
  });

  notificationStore.success('Teammate Added', `${newMemberName.value} joined the workspace.`);
  newMemberName.value = '';
  newMemberRole.value = '';
  isInviteOpen.value = false;
};
</script>

