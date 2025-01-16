<template>
  <FormWithTableCompnent
    v-if="textStore.text"
    :id="formId"
    :create-title="'Create Phrase'"
    :update-title="'Update Phrase'"
    :data-uri="uriData"
    :form-schema="phraseFormSchema"
    table-title="Phrases"
    :initial-data="{ text_id: textStore.text?.id }"
  />
</template>
<script setup lang="ts">
import { phraseFormSchema, textFormSchema } from '@mela/text/shared';
import { computed } from 'vue';

import { FormWithTableCompnent } from '@ghentcdh/ui';

import { usePhraseStore } from '../phrase.store';
import { useTextStore } from '../text.store';

const textStore = useTextStore();
const store = usePhraseStore();

const formId = computed(() => `phrase-${textStore.text?.id}`);
const uriData = computed(
  () => `${textFormSchema.uri}/${textStore.text?.id}/phrase`,
);
</script>
