<template>
  <FormWithTableCompnent
    v-if="textStore.text"
    :id="formId"
    :create-title="'Create Phrase'"
    :update-title="'Update Phrase'"
    :data-uri="uriData"
    :form-schema="PhraseFormSchema.schema"
    table-title="Phrases"
    :initial-data="{ text_id: textStore.text?.id }"
  />
</template>
<script setup lang="ts">
import { PhraseFormSchema } from '@mela/text/shared';
import { computed } from 'vue';

import { FormWithTableCompnent } from '@ghentcdh/ui';

import { usePhraseRepository } from '../../../repository/phrase.repository';
import { useTextStore } from '../text.store';

const textStore = useTextStore();
const phraseRepository = usePhraseRepository();
const formId = computed(() => `phrase-${textStore.text?.id}`);
const uriData = computed(() => phraseRepository.getDataUri(textStore.text!.id));
</script>
