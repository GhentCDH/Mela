<script setup lang="ts">
const { notifications } = storeToRefs(useNotifications());
</script>

<template>
  <div>
    <Message
      v-for="notification in notifications"
      :key="notification.id"
      :severity="notification.severity"
      :sticky="notification.sticky"
      @close="useNotifications().remove(notification.id)"
      @life-end="useNotifications().remove(notification.id)"
    >
      {{ notification.message }}
    </Message>
  </div>
</template>
