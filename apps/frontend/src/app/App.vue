<script setup lang="ts">
import { computedAsync } from '@vueuse/core';

import { ShellComponent } from '@ghentcdh/ui';

import { menu } from './configuration/menu';
import { useAuthenticate } from './utils';

console.log(import.meta.env);

const auth = useAuthenticate();
const user = computedAsync(async () => {
  return await auth.getUser();
});
</script>

<template>
  <ShellComponent
    title="MeLa | Meaning of LAnguage"
    :menu="menu()"
    :user="user"
    @click="auth.logout"
  >
    <RouterView />
  </ShellComponent>
</template>
