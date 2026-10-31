<template>
  <div
    v-if="taskStore.isCopilotModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
    @click.self="taskStore.isCopilotModalOpen = false"
  >
    <div
      class="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh] animate-fade-in"
    >
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span>Zenith AI Copilot</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                Online
              </span>
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400">Intelligent Sprint Intelligence & Codebase Reasoning</p>
          </div>
        </div>

        <button
          @click="taskStore.isCopilotModalOpen = false"
          class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Presets / Quick actions bar -->
      <div class="px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap gap-2">
        <button
          v-for="prompt in presetPrompts"
          :key="prompt.id"
          @click="runPrompt(prompt)"
          :disabled="isGenerating"
          class="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <span>{{ prompt.icon }}</span>
          <span>{{ prompt.label }}</span>
        </button>
      </div>

      <!-- Copilot Output Area -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4 min-h-[220px]">
        <div v-if="!currentOutput && !isGenerating" class="text-center py-10 text-slate-400">
          <svg class="w-10 h-10 mx-auto mb-2 text-indigo-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p class="text-sm font-medium text-slate-700 dark:text-slate-300">Select an AI action above or ask a sprint question</p>
          <p class="text-xs text-slate-400 mt-1">Copilot uses active board state & issue metadata to generate contextual responses.</p>
        </div>

        <div v-else class="space-y-3">
          <!-- Active Prompt Banner -->
          <div v-if="activePromptLabel" class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <span>✨ Prompt:</span>
            <span>{{ activePromptLabel }}</span>
          </div>

          <!-- Streaming Text Container -->
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
            {{ currentOutput }}<span v-if="isGenerating" class="inline-block w-2 h-4 bg-indigo-500 animate-pulse ml-0.5 align-middle"></span>
          </div>
        </div>
      </div>

      <!-- Footer / Custom Query Input -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
        <input
          v-model="customQuery"
          @keydown.enter="handleCustomQuery"
          :disabled="isGenerating"
          type="text"
          placeholder="Ask Copilot anything about current tasks, blockers, or velocity..."
          class="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        />
        <button
          @click="handleCustomQuery"
          :disabled="isGenerating || !customQuery.trim()"
          class="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 transition-colors shrink-0"
        >
          Send
        </button>

        <button
          v-if="currentOutput && !isGenerating"
          @click="copyOutput"
          class="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors shrink-0"
          title="Copy response"
        >
          📋 Copy
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/useTaskStore';
import { useNotificationStore } from '@/stores/useNotificationStore';

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const isGenerating = ref(false);
const currentOutput = ref('');
const activePromptLabel = ref('');
const customQuery = ref('');

const presetPrompts = [
  {
    id: 'risks',
    icon: '⚡',
    label: 'Analyze Sprint Bottlenecks',
    handler: (metrics, tasks) => {
      const urgent = tasks.filter(t => t.priority === 'urgent');
      return `### ⚡ Sprint 34 Bottleneck & Velocity Risk Analysis
- **Current Completion:** ${metrics.completionRate}% (${metrics.completedPoints}/${metrics.totalPoints} story points delivered).
- **Urgent Items In Flight:**
  ${urgent.map(u => `* [${u.id}] ${u.title} (Assigned to ${u.assigneeId})`).join('\n  ')}
- **Identified Blockers:**
  1. High density of backend tasks (ZEN-101, ZEN-108) requiring Redis & Postgres schema migration.
  2. Potential bottleneck on Marcus Chen with 32/35 allocated engineering hours.
- **Recommendations:**
  - Shift ZEN-106 (CSP Headers) to next sprint to protect core WebSocket delivery.
  - Pair Elena and Marcus on Redis pub/sub telemetry RFC to expedite code review.`;
    }
  },
  {
    id: 'release_notes',
    icon: '🚀',
    label: 'Draft GitHub Release Notes',
    handler: (metrics, tasks) => {
      const done = tasks.filter(t => t.status === 'done');
      return `## 🚀 Release v2.4.0 — Orion Milestone

### 🌟 What's New & Enhancements
${done.map(d => `- **${d.id}**: ${d.title}\n  *Labels: ${d.labels.join(', ')}*`).join('\n')}

### 🛠️ Engineering & Performance Metrics
- **Sprint Velocity Delivered:** ${metrics.completedPoints} Story Points
- **Zero Regression Score:** 100% test passing rate across ephemeral runner nodes
- **Accessibility:** WCAG AAA certified dark mode tokens integrated`;
    }
  },
  {
    id: 'subtasks',
    icon: '📋',
    label: 'Decompose Issue into Subtasks',
    handler: (metrics, tasks) => {
      const firstActive = tasks.find(t => t.status === 'in_progress') || tasks[0];
      return `### 📋 Deconstructed Subtask Checklist for ${firstActive.id}
**Target:** "${firstActive.title}"

1. [x] Phase 1: Architectural spike & baseline latency measurement
2. [ ] Phase 2: Interface contract & schema validation definitions
3. [ ] Phase 3: Error handling, exponential backoff, and circuit breakers
4. [ ] Phase 4: Unit test suite coverage (>90% threshold)
5. [ ] Phase 5: Documentation update in /docs/architecture.md and PR submission`;
    }
  }
];

const simulateStreaming = (fullText) => {
  isGenerating.value = true;
  currentOutput.value = '';
  let index = 0;
  const timer = setInterval(() => {
    if (index < fullText.length) {
      currentOutput.value += fullText.charAt(index);
      index++;
    } else {
      clearInterval(timer);
      isGenerating.value = false;
    }
  }, 12);
};

const runPrompt = (preset) => {
  activePromptLabel.value = preset.label;
  const response = preset.handler(taskStore.metrics, taskStore.tasks);
  simulateStreaming(response);
};

const handleCustomQuery = () => {
  if (!customQuery.value.trim()) return;
  activePromptLabel.value = customQuery.value;
  const q = customQuery.value;
  customQuery.value = '';

  const response = `### 💡 Zenith Copilot Response
Re: "${q}"

Based on the active board data (${taskStore.tasks.length} total tasks across 5 columns):
- **Sprint Health:** Currently on track with ${taskStore.metrics.completionRate}% completion.
- **Resource Allocation:** Front-end tasks are progressing smoothly; review bottleneck observed in CI/CD pipeline (ZEN-103).
- **Suggested Next Action:** Focus efforts on resolving the open pull request for spot instance autoscaling to unlock downstream deployment.`;

  simulateStreaming(response);
};

const copyOutput = () => {
  if (!currentOutput.value) return;
  navigator.clipboard.writeText(currentOutput.value);
  notificationStore.success('Copied', 'AI response copied to clipboard.');
};
</script>

