<template>
  <div
    v-if="phraseStore.text"
    class="max-w-screen-lg m-auto"
  >
    <h1>
      Text: {{ phraseStore.text.name }} (<small>mela id:</small>
      {{ phraseStore.text.mela_id }})
    </h1>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { usePhraseStore } from '../phrase.store';

const phraseStore = usePhraseStore();
</script>
