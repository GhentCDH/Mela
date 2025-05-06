<template>
  <AnnotationSelectionModal
    v-bind="properties"
    v-model="selection"
    annotation-type="lemma"
    :enable-save="false"
    :schema="schema"
    :extra-data="extraData"
    :valid="lemma?.id"
    @close-modal="closeModal"
  >
    <template #custom-content>
      <Autocomplete
        v-model="lemma"
        :config="lemmaConfig"
        :label="'Lemma'"
        :placeholder="'Select lemma'"
        label-key="word"
      />
      <Btn :icon="IconEnum.Plus" @click="createLema"> Create new Lemma</Btn>
    </template>
  </AnnotationSelectionModal>
</template>

<script setup lang="ts">
import type { AnnotationStartEnd } from '@mela/text/shared';
import {
  AnnotationExampleLemmaSchema,
  findLemmaMetaData,
  LemmaFormSchema,
} from '@mela/text/shared';
import { pick } from 'lodash-es';
import { computed, onMounted, ref } from 'vue';

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

import type { LemmaSelectionModalProps } from './annotation-selection-modal.props';
import AnnotationSelectionModal from './annotation-selection-modal.vue';
import { useLemmaRepository } from '../../../../../../../repository/lemma.repository';

const properties = defineProps<LemmaSelectionModalProps>();
const selection = ref<AnnotationStartEnd>();
const schema = AnnotationExampleLemmaSchema;

const emits = defineEmits(['closeModal']);

const lemma = ref();

onMounted(() => {
  if (!properties.annotation) return;
  const metadata = findLemmaMetaData(properties.annotation)?.value;
  lemma.value = metadata;
});

const lemmaConfig: AutoCompleteConfig = {
  uri: LemmaFormSchema.schema.searchUri,
  dataField: 'data',
};

const createLema = () => {
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
const extraData = computed(() => {
  return {
    lemma: lemma.value,
    exampleAnnotation: pick(properties.parentAnnotation, 'id'),
  };
});
const closeModal = (event) => {
  emits('closeModal', event);
};
</script>
