<template>
  <div class="toast toast-top toast-center z-[999]">
    <div
      v-for="notification of store.notifications"
      :key="notification.id"
      :class="`alert alert-${notification.type}`"
    >
      <span>{{ notification.message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from './toast.store';

const store = useNotificationStore();
</script>
