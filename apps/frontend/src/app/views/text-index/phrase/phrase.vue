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
import { useFormStore } from '@ghentcdh/ui';

import { usePhraseStore } from '../phrase.store';
import { phrase_store_id, phrase_uri } from './phrase.const';

const phraseStore = usePhraseStore();
const formStore = useFormStore(phrase_store_id);
formStore.init(`${phrase_uri}/schema`);
</script>
