<template>
  <div
    v-if="store.text"
    class="max-w-screen-lg m-auto"
  >
    <h1>
      Text: {{ store.text.name }} (<small>mela id:</small>
      {{ store.text.mela_id }})
    </h1>
    <div class="max-w-screen-lg m-auto">
      <FormWithTableCompnent
        :id="formId"
        :create-title="'Create Phrase'"
        :update-title="'Update Phrase'"
        :data-uri="uriData"
        :form-schema="phraseFormSchema"
        table-title="Texts"
        :initial-data="{ text_id: store.text?.id }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { phraseFormSchema, textFormSchema } from '@mela/text/shared';
import { computed } from 'vue';

import { FormWithTableCompnent } from '@ghentcdh/ui';

import { usePhraseStore } from '../phrase.store';

const store = usePhraseStore();

const formId = computed(() => `phrase-${store.text?.id}`);
const uriData = computed(() =>
  store.text ? `${textFormSchema.uri}/${store.text?.id}/phrase` : null,
);
</script>
