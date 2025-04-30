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
      <Btn
        :icon="IconEnum.Plus"
        @click="createLemma"
      >
        Create new Lemma
      </Btn>
    </template>
    <template #custom-actions>
      <Btn
        :disabled="!selection || !lemma?.id"
        @click="onSubmit"
      >
        Save
      </Btn>
    </template>
  </AnnotationSelectionModal>
</template>

<script setup lang="ts">
import type { AnnotationStartEnd } from '@mela/text/shared';
import {
  AnnotationExampleLemmaSchema,
  LemmaFormSchema,
} from '@mela/text/shared';
import { pick } from 'lodash-es';
import { ref } from 'vue';

import {
  type FormModalResult,
  FormModalService,
} from '@ghentcdh/json-forms/vue';
import {
  type AutoCompleteConfig,
  Autocomplete,
  Btn,
  IconEnum,
} from '@ghentcdh/ui';

import AnnotationSelectionModal from './annotation-selection-modal.vue';
import type { LemaSelectionModalProps } from './lema-selection-modal';
import { createSelection } from './selection.utils';
import { useLemmaRepository } from '../../../../../../../repository/lemma.repository';
import { useAnnotationStore } from '../../store/annotation.store';

const properties = defineProps<LemaSelectionModalProps>();
const selection = ref<AnnotationStartEnd>();
const schema = AnnotationExampleLemmaSchema;

const emits = defineEmits(['closeModal']);
const annotationStore = useAnnotationStore(properties.storeId);

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

const onSubmit = async () => {
  const data = createSelection(
    selection.value,
    'lemma',
    properties.parentAnnotation,
    properties.source,
    schema,
    {
      lemma: lemma.value,
      exampleAnnotation: pick(properties.parentAnnotation, 'id'),
    },
  );

  const annotationId = properties.annotation?.id ?? null;

  const annotation = await annotationStore.saveOrCreateAnnotation(
    annotationId,
    data,
  );

  emits('closeModal', { valid: true, data: annotation });
};
</script>
