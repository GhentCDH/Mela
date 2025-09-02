<template>
  <div class="flex flex-col gap-2 h-full">
    <Menu
      title="Elements"
      :menu="bookMenuStore.menu"
      :breadcrumbs="bookMenuStore.breadcrumbs"
    />
    <div class="h-full min-h-0">
      <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import { Menu, ModalService } from '@ghentcdh/ui';

import { useBookMenuStore } from './book-menu.store';

onMounted(() => {
  ModalService.closeAll();
});

const bookMenuStore = useBookMenuStore();
</script>
