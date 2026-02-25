<template>
  <div class="flex flex-col gap-2 h-full">
    <Menu
      title="Elements"
      :menu="sectionMenuStore.menu"
      :breadcrumbs="sectionMenuStore.breadcrumbs"
    />
    <div class="h-full min-h-0">
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
