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
