<template>
  <div
    role="alert"
    :class="`alert ${Colors[type]} `"
  >
    <span>{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import type { ToastType } from './toast-message';

defineProps<{
  message: string;
  type: ToastType;
}>();

const Colors: Record<ToastType, string> = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
};
</script>
