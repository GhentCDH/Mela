<template>
  <Modal
    :modal-title="'Create lema'"
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
            :cols="1"
            @on-event="eventHandler"
          />
        </div>
      </ControlWrapper>
      <div class="flex gap-2 items-center">
        <Autocomplete
          v-model="lema"
          :config="lemaConfig"
          :label="'Lema'"
          :placeholder="'Select lema'"
          label-key="word"
        />
        <Btn :icon="IconEnum.Plus" @click="createLema">Create new Lema</Btn>
      </div>
    </template>
    <template #actions>
      <Btn :color="Color.secondary" :outline="true" @click="onCancel">
        Cancel
      </Btn>
      <Btn :disabled="disabled" @click="onSubmit"> Save</Btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import {
  AnnotationExampleLemaSchema,
  getAnnotationUri,
  LemaFormSchema,
} from '@mela/text/shared';
import { pick } from 'lodash-es';
import { computed, ref } from 'vue';

import type { SourceModel } from '@ghentcdh/annotations/core';
import { createTextSelectionAnnotation } from '@ghentcdh/annotations/core';
import {
  type AnnotationEventHandlerPayloadData,
  type AnnotationEventType,
  GhentCdhAnnotations,
} from '@ghentcdh/annotations/vue';
import {
  FormModal,
  type FormModalProps,
  type FormModalResult,
} from '@ghentcdh/json-forms/vue';
import {
  Autocomplete,
  type AutoCompleteConfig,
  Btn,
  Color,
  ControlWrapper,
  IconEnum,
  Modal,
  ModalService,
  Size,
} from '@ghentcdh/ui';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text/dist/src';

import type { LinkLemaModalProps } from './link-lema-modal.props';
import { findTextValue } from '../utils/translation';

import { useLemaRepository } from '../../../../../repository/lema.repository';

const properties = defineProps<LinkLemaModalProps>();
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
const lema = ref();

const lemaConfig: AutoCompleteConfig = {
  uri: LemaFormSchema.schema.searchUri,
  dataField: 'data',
};

const sources = computed(() => {
  const tb = textBody.value;
  if (!tb) {
    return [];
  }

  return [source.value];
});

const lemaAnnotation = ref();

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
      lemaAnnotation.value = annotation;
      break;
    default:
      console.log('event not handled', e);
  }
};

const annotations = computed(() => {
  if (!lemaAnnotation.value) {
    return [];
  }
  return [
    createTextSelectionAnnotation(
      source.value,
      pick(lemaAnnotation.value, ['start', 'end']),
      'lema',
    ),
  ];
});

const createLema = () => {
  const formSchema = LemaFormSchema.schema;
  ModalService.openModal<FormModalProps, any>({
    component: FormModal,
    props: {
      formSchema: formSchema.form,
      data: {},
      modalTitle: 'Create Lema',
      onClose: (result: FormModalResult) => {
        if (result && result.valid) {
          useLemaRepository()
            .create(result.data)
            .then((response) => {
              lema.value = response;
            });
        }
      },
    },
  });
};

const onCancel = () => {
  // ModalService.closeModal();
  emits('closeModal', null);
};

const onSubmit = () => {
  const exampleLemma = {
    annotation: lemaAnnotation.value,
    lema: lema.value,
    example: pick(properties.annotation, 'id'),
    id: lemaAnnotation.value.id,
    textContent: pick(properties.textContent, 'id'),
  };

  const data = AnnotationExampleLemaSchema.parse(exampleLemma);
  emits('closeModal', { valid: true, data });
};

const disabled = computed(() => {
  if (!lema.value) {
    return true;
  }
  return !lemaAnnotation.value;
});
</script>
