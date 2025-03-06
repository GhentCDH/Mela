<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import { computed, inject } from 'vue';

import {
  getUser,
  isAuthenticated,
} from '@ghentcdh/authentication-vue/lib/utils';
import { ShellComponent } from '@ghentcdh/ui';

import { menu } from './configuration/menu';
import { useAuthenticate } from './utils';

const auth = useAuthenticate();
const user = computedAsync(async () => {
  const user = await auth.getUser();

  console.log(user);
  console.log(auth.isAuthenticated());

  return user;
});
</script>

<template>
  <ShellComponent
    title="MeLa | Meaning of LAnguage"
    :menu="menu()"
    :user="user"
  >
    <RouterView />
  </ShellComponent>
</template>
