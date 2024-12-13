<script setup lang="ts">
import { useAuthenticationStore } from '@ghentcdh/authentication/frontend';
import { ShellComponent } from '@ghentcdh/ui';

import { menu } from './configuration/menu';

const authenticationStore = useAuthenticationStore();
</script>

<template>
  <ShellComponent
    title="MeLa | Meaning of LAnguage"
    :menu="menu()"
  >
    <RouterView />
  </ShellComponent>
</template>
