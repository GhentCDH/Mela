<template>
  <Modal
    :modal-title="title"
    :open="true"
    :disable-close="false"
    width="lg"
    @close-modal="onCancel"
  >
    <template #content>
      <ControlWrapper
        :label="selectLabel"
        :error="false"
        :required="true"
      >
        <div class="border border-1 border-gray-200 my-2 text-lg">
          <GhentCdhAnnotations
            :sources="sources"
            :annotations="annotations"
            :annotation-actions="annotationActions"
            :use-snapper="useWordSnapper"
            :cols="1"
            @on-event="eventHandler"
          />
          <Btn
            :outline="true"
            @click="selectAll"
          >
            Select all text
          </Btn>
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
} from '@mela/text/shared';
import { pick } from 'lodash-es';
import { computed, onMounted } from 'vue';

import {
  SourceModelSchema,
  createTextSelectionAnnotation,
  findTextPositionSelector,
} from '@ghentcdh/annotations/core';
import {
  type AnnotationEventHandlerPayloadData,
  type AnnotationEventType,
  GhentCdhAnnotations,
  useWordSnapper,
} from '@ghentcdh/annotations/vue';
import { Btn, Color, ControlWrapper, Modal } from '@ghentcdh/ui';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text/dist/src';

import type { AnnotationSelectionModalProps } from './annotation-selection-modal.props';
import { createSelection } from './selection.utils';
import { AnnotationTypeLabelValue } from '../../../identify.color';
import { useAnnotationStore } from '../../store/annotation.store';
import { findTextValue } from '../../utils/translation';

// Schema for validation
const properties = withDefaults(defineProps<AnnotationSelectionModalProps>(), {
  mode: 'create',
  schema: AnnotationSelectorSchema,
  onClose: () => {},
  extraData: {},
  valid: true,
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
const parentSelector = computed(() =>
  findTextPositionSelector(properties.source.uri)(properties.parentAnnotation),
);

const source = computed(() => {
  if (!properties.parentAnnotation) return properties.source;
  return SourceModelSchema.parse({
    ...properties.source,
    content: {
      text: textBody.value.value,
      schema: AnnotationSelectorSchema,
      processingLanguage: textBody.value.language,
      offset: parentSelector.value.selector.start,
    },
  });
});

onMounted(() => {
  if (!properties.annotation) return;
  const metadata = findTextPositionSelector(properties.source.uri)(
    properties.annotation,
  )?.selector;
  selection.value = {
    start: metadata.start,
    end: metadata.end,
  };
});

const sources = computed(() => {
  return [source.value];
});

const selection = defineModel<AnnotationStartEnd>();

const annotationActions = computed(() => {
  return {
    [source.value.uri]: {
      edit: properties.mode === 'edit',
      create: properties.mode === 'create',
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
    return properties.mode === 'edit' ? [properties.annotation] : [];
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
  emits('closeModal', null);
};

const onSubmit = async () => {
  const data = createSelection(
    selection.value,
    properties.annotationType,
    properties.parentAnnotation,
    properties.source,
    properties.schema,
    properties.extraData,
  );

  const annotationId = properties.annotation?.id ?? null;
  const annotation = await annotationStore.saveOrCreateAnnotation(
    annotationId,
    data,
  );

  emits('closeModal', { valid: true, data: annotation });
};

const disabled = computed(() => {
  // TODO if there is metadata needed validate it here!
  return !properties.valid || !selection.value;
});

const selectAll = () => {
  selection.value = {
    start: 0,
    end: properties.source.content.text.length,
  };
};
</script>
