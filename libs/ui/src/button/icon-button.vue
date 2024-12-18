<template>
  <button
    class="btn btn-square btn-outline btn-sm p-1"
    @click="emit('click')"
  >
    <Icon :icon="icon" />
  </button>
</template>

<script setup lang="ts">
import { Icon, IconDef } from '../icons';

defineProps<{
  icon: IconDef;
}>();

const emit = defineEmits(['click']);
</script>
