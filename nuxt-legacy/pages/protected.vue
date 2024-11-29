<template>
  <div>
    <h2>A protected page</h2>
    <p>Only accessible to users with role 'default-roles-stack-realm'</p>
  </div>
</template>

<script setup lang="ts">
//see here https://sidebase.io/nuxt-auth/v0.5/application-side/protecting-pages
definePageMeta({
  middleware: "authentication",
  role_required: "default-roles-stack-realm",
});
</script>
