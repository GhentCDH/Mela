<template>
  <div
    v-if="store.text"
    class="max-w-screen-lg m-auto"
  >
    <h1>Text: {{ store.text.name }}</h1>
    <div class="max-w-screen-lg m-auto">
      <div
        role="tablist"
        class="tabs tabs-bordered"
      >
        <RouterLink
          v-for="tab in tabs"
          :key="tab.name"
          :to="{ name: tab.name }"
          role="tab"
          class="tab"
          exact-active-class="tab-active"
        >
          {{ tab.label }}
        </RouterLink>
      </div>
      <div class="mt-2">
        <router-view />
      </div>
    </div>
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
