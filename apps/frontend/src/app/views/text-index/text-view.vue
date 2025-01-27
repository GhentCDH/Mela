<template>
  <div
    v-if="store.text"
    class="max-w-screen-lg m-auto"
  >
    <h1>Text: {{ store.text.name }}</h1>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { useTextStore } from './text.store';

const store = useTextStore();

const tabs = [
  {
    name: 'text-index-detail',
    label: 'Detail',
  },
  {
    name: 'text-index-preview',
    label: 'Preview',
  },
  {
    name: 'text-index-phrase',
    label: 'Phrase',
  },
];
</script>
