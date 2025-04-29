<template>
  <Modal
    :modal-title="title"
    :open="true"
    :disable-close="false"
    :width="Size.lg"
    @close-modal="onCancel"
  >
    <template #content>
      <ControlWrapper
        :label="selectLabel"
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
        <slot name="custom-content" />
      </div>
    </template>
    <template #actions>
      <Btn
        :color="Color.secondary"
        :outline="true"
        @click="onCancel"
      >
        Cancel
      </Btn>
      <slot name="custom-actions" />
      <Btn
        v-if="enableSave"
        :disabled="disabled"
        @click="onSubmit"
      >
        Save
      </Btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import {
  AnnotationSelectorSchema,
  type AnnotationStartEnd,
  getAnnotationUri,
} from '@mela/text/shared';
import { pick } from 'lodash-es';
import { computed } from 'vue';

import {
  type SourceModel,
  createTextSelectionAnnotation,
} from '@ghentcdh/annotations/core';
import {
  type AnnotationEventHandlerPayloadData,
  type AnnotationEventType,
  GhentCdhAnnotations,
  useWordSnapper,
} from '@ghentcdh/annotations/vue';
import { Btn, Color, ControlWrapper, Modal, Size } from '@ghentcdh/ui';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text/dist/src';

import type { AnnotationSelectionModalProps } from './annotation-selection-modal.props';
import { createSelection } from './selection.utils';
import { AnnotationTypeLabelValue } from '../../../identify.color';
import { useAnnotationStore } from '../../store/annotation.store';
import { findTextValue } from '../../utils/translation';

// Schema for validation
const properties = withDefaults(defineProps<AnnotationSelectionModalProps>(), {
  mode: 'create',
  enableSave: true,
  schema: AnnotationSelectorSchema,
});
const emits = defineEmits(['closeModal']);

const annotationStore = useAnnotationStore(properties.storeId);
const type = AnnotationTypeLabelValue[properties.annotationType];
const title =
  properties.mode === 'edit' ? `Edit ${type.label}` : `Create ${type.label}`;
const selectLabel =
  properties.mode === 'edit'
    ? `Adjust ${type.label} selection`
    : `Select ${type.label} selection`;

const textBody = computed(() => findTextValue(properties.parentAnnotation));
const annotationUri = computed(() =>
  getAnnotationUri(properties.parentAnnotation),
);

const source = computed(() => {
  if (!properties.parentAnnotation)
    return {
      ...properties.source,
      id: '1',
      uri: annotationUri.value,
      type: 'text',
    };

  return {
    id: '1',
    uri: annotationUri.value,
    type: 'text',
    content: {
      text: textBody.value.value,
      schema: AnnotationSelectorSchema,
      processingLanguage: textBody.value.language,
    },
  } as SourceModel;
});

const sources = computed(() => {
  const tb = textBody.value;
  if (!tb) {
    return [];
  }

  return [source.value];
});

const selection = defineModel<AnnotationStartEnd>();

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
    case 'update--end':
      const annotation = (
        payload.payload as CreateAnnotationState
      ).getAnnotation();
      selection.value = annotation;
      break;
    default:
      console.warn('event not handled', e);
  }
};

const annotations = computed(() => {
  if (!selection.value) {
    createSelection;
    return [];
  }
  return [
    createTextSelectionAnnotation(
      source.value,
      pick(selection.value, ['start', 'end']),
      'lemma',
    ),
  ];
});

const onCancel = () => {
  // ModalService.closeModal();
  emits('closeModal', null);
};

const onSubmit = () => {
  const data = createSelection(
    selection.value,
    properties.annotationType,
    properties.parentAnnotation,
    properties.source,
    properties.schema,
  );

  const annotationId = properties.annotation?.id ?? null;
  annotationStore.saveOrCreateAnnotation(annotationId, data);

  emits('closeModal', { valid: true, data });
};

const disabled = computed(() => {
  // TODO if there is metadata needed validate it here!
  return !selection.value;
});
</script>
