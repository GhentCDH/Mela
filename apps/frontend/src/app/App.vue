<script setup lang="ts">
import {
  useAuthenticationStore,
  useHttpStore,
} from '@ghentcdh/authentication/frontend';
import { Debugger } from '@ghentcdh/tools/logging/frontend';

const authenticationStore = useAuthenticationStore();
const httpStore = useHttpStore();

Debugger.table(import.meta.env);

window.setTimeout(() => {
  checkAuth();
}, 1000);
</script>

<template>
  <div class="navbar bg-base-100">
    <a class="btn btn-ghost text-xl">daisyUI</a>
  </div>
  {{ authenticationStore.isAuthenticated() }}<br>
  {{ authenticationStore.token() }}<br>
  <pre>{{ authenticationStore.user() }}</pre>
  Hello world
</template>
