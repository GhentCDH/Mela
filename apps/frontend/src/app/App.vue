<script setup lang="ts">
import {useAuthenticationStore, useHttpStore} from "@ghentcdh/authentication/frontend";


const authenticationStore = useAuthenticationStore()
const httpStore = useHttpStore();


const checkAuth = () => {
  console.log(authenticationStore.isAuthenticated());
  console.log(authenticationStore.token());
  console.log(authenticationStore.user());


  httpStore.post('/api/auth/login').then(response => {
    console.log(response);
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

  <button @click="checkAuth">
    Check Auth
  </button>
</template>
