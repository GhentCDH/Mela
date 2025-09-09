<template>
  <div
    v-if="loading"
    class="flex items-center justify-center h-20"
  >
    <span class="loading loading-bars loading-md text-primary" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();
</script>
