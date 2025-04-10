<template>
  <Modal
    :modal-title="'Create lemma'"
    :open="true"
    :disable-close="false"
    :width="Size.lg"
    @close-modal="onCancel"
  >
    <template #content>
      <ControlWrapper
        :label="'Select linked words'"
        :error="false"
        :required="true"
      >
        <div class="border border-1 border-gray-200 my-2">
          <GhentCdhAnnotations
            :sources="sources"
            :annotations="annotations"
            :annotation-actions="annotationActions"
            :use-snapper="useWordSnapper"
            :cols="1"
            @on-event="eventHandler"
          />
        </div>
      </ControlWrapper>
      <div class="flex gap-2 items-center">
        <Autocomplete
          v-model="lemma"
          :config="lemmaConfig"
          :label="'Lemma'"
          :placeholder="'Select lemma'"
          label-key="word"
        />
        <Btn :icon="IconEnum.Plus" @click="createLemma"> Create new Lemma </Btn>
      </div>
    </template>
    <template #actions>
      <Btn :color="Color.secondary" :outline="true" @click="onCancel">
        Cancel
      </Btn>
      <Btn :disabled="disabled" @click="onSubmit"> Save </Btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { AnnotationStartEnd } from '@mela/text/shared';
import {
  AnnotationExampleLemmaSchema,
  getAnnotationUri,
  LemmaFormSchema,
} from '@mela/text/shared';
import { pick } from 'lodash-es';
import { computed, ref } from 'vue';

import type { SourceModel } from '@ghentcdh/annotations/core';
import {
  createTextSelectionAnnotation,
  findTextPositionSelector,
} from '@ghentcdh/annotations/core';
import {
  type AnnotationEventHandlerPayloadData,
  type AnnotationEventType,
  GhentCdhAnnotations,
  useWordSnapper,
} from '@ghentcdh/annotations/vue';
import {
  type FormModalResult,
  FormModalService,
} from '@ghentcdh/json-forms/vue';
import {
  Autocomplete,
  type AutoCompleteConfig,
  Btn,
  Color,
  ControlWrapper,
  IconEnum,
  Modal,
  Size,
} from '@ghentcdh/ui';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text/dist/src';

import type { LinkLemmaModalProps } from './link-lemma-modal.props';
import { useLemmaRepository } from '../../../../../repository/lemma.repository';
import { findTextValue } from '../utils/translation';

const properties = defineProps<LinkLemmaModalProps>();
const emits = defineEmits(['closeModal']);
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

const sources = computed(() => {
  const tb = textBody.value;
  if (!tb) {
    return [];
  }

  return [source.value];
});

const lemmaAnnotation = ref<AnnotationStartEnd>();

const annotationActions = computed(() => {
  return {
    [annotationUri.value]: {
      edit: false,
      create: true,
    },
  };
});
const eventHandler = (
  e: AnnotationEventType,
  payload: AnnotationEventHandlerPayloadData<unknown>,
) => {
  switch (e) {
    case 'click-annotation':
    case 'click-outside':
      // onSelectAnnotation(payload.target, payload.annotationId);
      break;
    case 'create--end':
      const annotation = (
        payload.payload as CreateAnnotationState
      ).getAnnotation();
      lemmaAnnotation.value = annotation;
      break;
    default:
      console.warn('event not handled', e);
  }
};

const annotations = computed(() => {
  if (!lemmaAnnotation.value) {
    return [];
  }
  return [
    createTextSelectionAnnotation(
      source.value,
      pick(lemmaAnnotation.value, ['start', 'end']),
      'lemma',
    ),
  ];
});

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

const onCancel = () => {
  // ModalService.closeModal();
  emits('closeModal', null);
};

const onSubmit = () => {
  const annotation = lemmaAnnotation.value;

  // Add the original start and endpoint
  const selector = findTextPositionSelector(properties.textContent.uri)(
    properties.annotation,
  )?.selector;

  annotation.start += selector.start;
  annotation.end += selector.start;

  const exampleLemma = {
    annotation,
    lemma: lemma.value,
    exampleAnnotation: pick(properties.annotation, 'id'),
    id: lemmaAnnotation.value.id,
    textContent: pick(properties.textContent, 'id'),
  };
  const data = AnnotationExampleLemmaSchema.parse(exampleLemma);
  emits('closeModal', { valid: true, data });
};

const disabled = computed(() => {
  if (!lemma.value?.id) {
    return true;
  }
  return !lemmaAnnotation.value;
});
</script>
