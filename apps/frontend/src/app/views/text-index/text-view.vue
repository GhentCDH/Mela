<template>
  <div v-if="store.text" class="max-w-screen-lg m-auto">
    <h1>Text: {{ store.text.name }}</h1>
  </div>
  <router-view />
</template>
<script setup lang="ts">
import { useTextStore } from './text.store';

const store = useTextStore();
</script>
