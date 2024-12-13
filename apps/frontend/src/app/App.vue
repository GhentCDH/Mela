<script setup lang="ts">
import { useAuthenticationStore } from '@ghentcdh/authentication/frontend';
import { Debugger } from '@ghentcdh/tools/logging/frontend';

const authenticationStore = useAuthenticationStore();

Debugger.table(import.meta.env);
</script>

<template>
  <div class="navbar bg-primary">
    <a class="btn btn-ghost text-xl">daisyUI</a>
  </div>
  {{ authenticationStore.isAuthenticated() }}<br />
  {{ authenticationStore.token() }}<br />
  <pre>{{ authenticationStore.user() }}</pre>
  Hello world
</template>
