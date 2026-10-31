<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border transition-colors',
      type === 'priority' ? priorityMeta.badgeClass : statusMeta.badgeClass
    ]"
  >
    <span
      v-if="type === 'priority'"
      :class="['w-1.5 h-1.5 rounded-full', priorityMeta.dotClass]"
    ></span>
    <span>{{ label }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { getPriorityMeta, getStatusMeta } from '@/utils/formatters';

const props = defineProps({
  type: {
    type: String,
    default: 'priority' // 'priority' | 'status'
  },
  value: {
    type: String,
    required: true
  }
});

const priorityMeta = computed(() => getPriorityMeta(props.value));
const statusMeta = computed(() => getStatusMeta(props.value));

const label = computed(() => {
  return props.type === 'priority' ? priorityMeta.value.label : statusMeta.value.label;
});
</script>

