<template>
  <div class="toast toast-top toast-center z-[999]">
    <ToastMessage
      v-for="notification of store.notifications"
      :key="notification.id"
      v-bind="notification"
    />
  </div>
</template>

<script setup lang="ts">
import ToastMessage from './toast-message.vue';
import { useNotificationStore } from './toast.store';

const store = useNotificationStore();
</script>
