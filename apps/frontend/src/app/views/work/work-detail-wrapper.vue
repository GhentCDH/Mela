<template>
  <div class="flex flex-col gap-2 h-[calc(100vh-5rem)] overflow-hidden">
    <Menu
      title="Elements"
      :menu="sectionMenuStore.menu"
      :breadcrumbs="sectionMenuStore.breadcrumbs"
    />
    <div class="flex-1 min-h-0 overflow-auto">
      <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import { Menu, ModalService } from '@ghentcdh/ui';

import { useWorkMenu } from './work-menu.store';

onMounted(() => {
  ModalService.closeAll();
});

const sectionMenuStore = useWorkMenu();
</script>
