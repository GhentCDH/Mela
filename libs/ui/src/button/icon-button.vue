<template>
  <Btn
    :icon="icon"
    v-bind="properties"
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
import Btn, { ButtonProps } from './btn.vue';

const properties = defineProps<ButtonProps>();

const emit = defineEmits(['click']);
</script>
