<script setup lang="ts">
import {useAuthenticationStore, useHttpStore} from "@ghentcdh/authentication/frontend";
import {Debugger} from "@ghentcdh/tools/logging/frontend";


const authenticationStore = useAuthenticationStore()
const httpStore = useHttpStore();

Debugger.table(import.meta.env)
const checkAuth = () => {
  httpStore.post('/api/auth/login', {}).then(response => {
    Debugger.log(response);
    alert('login ok')
  });
}

window.setTimeout(() => {
  checkAuth();
}, 1000);
</script>

<template>
  {{ authenticationStore.isAuthenticated() }}<br>
  {{ authenticationStore.token() }}<br>
  <pre>{{ authenticationStore.user() }}</pre>
  Hello world
  <button @click="checkAuth">
    Check Auth
  </button>
</template>
