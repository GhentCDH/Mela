<template>
  <Menu
    title="Elements"
    :menu="bookMenuStore.menu"
    :breadcrumbs="bookMenuStore.breadcrumbs"
  />
  <RouterView />
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
