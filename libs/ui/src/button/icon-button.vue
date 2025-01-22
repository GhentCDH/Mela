<template>
  <Btn
    :icon="icon"
    v-bind="properties"
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
import type { ButtonProps } from './btn.vue';
import Btn from './btn.vue';

const properties = defineProps<ButtonProps>();

const emit = defineEmits(['click']);
</script>
