<template>
  <div class="flex flex-col gap-2 h-[calc(100vh-5rem)] overflow-hidden">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import { ModalService } from '@ghentcdh/ui';
import { useWorkStore } from './work.store';

onMounted(() => {
  ModalService.closeAll();
});

const workStore = useWorkStore();
</script>
