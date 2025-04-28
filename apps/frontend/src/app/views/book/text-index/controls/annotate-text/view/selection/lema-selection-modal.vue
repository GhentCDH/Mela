<template>
  <AnnotationSelectionModal
    v-bind="properties"
    v-model="selection"
    annotation-type="lemma"
    :enable-save="false"
    :schema="schema"
  >
    <template #custom-content>
      <Autocomplete
        v-model="lemma"
        :config="lemmaConfig"
        :label="'Lemma'"
        :placeholder="'Select lemma'"
        label-key="word"
      />
      <Btn :icon="IconEnum.Plus" @click="createLemma"> Create new Lemma</Btn>
    </template>
    <template #custom-actions>
      <Btn :disabled="!selection || !lemma.id" @click="onSubmit"> Save</Btn>
    </template>
  </AnnotationSelectionModal>
</template>

<script setup lang="ts">
import {
  AnnotationExampleLemmaSchema,
  AnnotationStartEnd,
  getAnnotationUri,
  LemmaFormSchema,
} from '@mela/text/shared';
import { pick } from 'lodash-es';
import { computed, ref } from 'vue';

import type { SourceModel } from '@ghentcdh/annotations/core';
import {
  type FormModalResult,
  FormModalService,
} from '@ghentcdh/json-forms/vue';
import {
  Autocomplete,
  type AutoCompleteConfig,
  Btn,
  IconEnum,
} from '@ghentcdh/ui';

import { LemaSelectionModalProps } from './lema-selection-modal';
import { useLemmaRepository } from '../../../../../../../repository/lemma.repository';
import { useAnnotationStore } from '../../store/annotation.store';
import { findTextValue } from '../../utils/translation';
import AnnotationSelectionModal from './annotation-selection-modal.vue';
import { createSelection } from './selection.utils';

const properties = defineProps<LemaSelectionModalProps>();

const selection = ref<AnnotationStartEnd>();
const schema = AnnotationExampleLemmaSchema;

const emits = defineEmits(['closeModal']);
const annotationStore = useAnnotationStore(properties.storeId);
const textBody = computed(() => findTextValue(properties.annotation));
const annotationUri = computed(() => getAnnotationUri(properties.annotation));
const source = computed(() => {
  return {
    id: '1',
    uri: annotationUri.value,
    type: 'text',
    content: {
      text: textBody.value.value,
      processingLanguage: textBody.value.language,
    },
  } as SourceModel;
});
const lemma = ref();

const lemmaConfig: AutoCompleteConfig = {
  uri: LemmaFormSchema.schema.searchUri,
  dataField: 'data',
};

const createLemma = () => {
  const formSchema = LemmaFormSchema.schema;
  FormModalService.openModal({
    formSchema: formSchema.form,
    modalTitle: 'Create Lemma',
    onClose: (result: FormModalResult) => {
      if (result && result.valid) {
        useLemmaRepository()
          .create(result.data)
          .then((response) => {
            lemma.value = response;
          });
      }
    },
  });
};

const onSubmit = () => {
  const data = createSelection(
    selection.value,
    'lemma',
    properties.annotation,
    properties.textContent,
    schema,
    {
      lemma: lemma.value,
      exampleAnnotation: pick(properties.annotation, 'id'),
    },
  );

  const annotationId =
    properties.mode === 'create' ? null : properties.annotation.id;
  annotationStore.saveOrCreateAnnotation(annotationId, data);

  emits('closeModal', { valid: true, data });
};
</script>
