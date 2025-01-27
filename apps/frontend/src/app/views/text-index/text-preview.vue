<template>
  read component

  {{ phrases }}
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { usePhraseStore } from './phrase.store';

const store = usePhraseStore();

// TOOD map in chapters and so on
const phrases = computed(() => store.phrases);
</script>
