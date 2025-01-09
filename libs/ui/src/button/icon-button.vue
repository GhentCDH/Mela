<template>
  <button
    class="btn btn-square btn-outline btn-sm p-1"
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
import Btn, { ButtonProps } from './btn.vue';

const properties = defineProps<ButtonProps>();

const emit = defineEmits(['click']);
</script>
