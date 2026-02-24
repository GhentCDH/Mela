<script setup lang="ts">
import { ShellComponent } from '@ghentcdh/ui';

import { menu } from './configuration/menu';
import { mela_env, useAuthenticate } from './utils';

const auth = useAuthenticate();
// const user = computedAsync(async () => {
//   return await auth.getUser();
// });

const user = {};
</script>

<template>
  <ShellComponent
    title="MeLa | Meaning of LAnguage"
    :menu="menu()"
    :user="user"
    :version="mela_env.VERSION"
    :width-sidebar="200"
    @click="auth.logout"
  >
    <router-view />
  </ShellComponent>
</template>
