<template>
  <router-view />
</template>
<script setup lang="ts">
import { useTextStore } from './text.store';

const store = useTextStore();
</script>
