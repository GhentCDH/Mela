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
          <div :id="id" />
          <!--          <GhentCdhAnnotations-->
          <!--            :sources="sources"-->
          <!--            :annotations="annotations"-->
          <!--            :annotation-actions="annotationActions"-->
          <!--            :use-snapper="useWordSnapper"-->
          <!--            :cols="1"-->
          <!--            @on-event="eventHandler"-->
          <!--          />-->
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
import { AnnotationSelectorSchema } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';
import { computed, onMounted, onUnmounted, ref } from 'vue';

import type { AnnotatedText, W3CAnnotation } from '@ghentcdh/annotated-text';
import {
  MarkdownTextAdapter,
  W3CAnnotationAdapter,
  WordSnapper,
  createAnnotatedText,
  createTextSelectionAnnotation,
  findTextPositionSelector,
  updateTextSelectionAnnotation,
} from '@ghentcdh/annotated-text';
import { Btn, Color, ControlWrapper, Modal } from '@ghentcdh/ui';

import type { AnnotationSelectionModalProps } from './annotation-selection-modal.props';
import { createSelection } from './selection.utils';
import {
  AnnotationTypeLabelValue,
  IdentifyColorMap,
} from '../../../identify.color';
import { useAnnotationStore } from '../../store/annotation.store';

// Schema for validation
const properties = withDefaults(defineProps<AnnotationSelectionModalProps>(), {
  mode: 'create',
  schema: AnnotationSelectorSchema,
  onClose: () => {},
  extraData: {},
  valid: true,
});
const emits = defineEmits(['closeModal']);
const id = `annotated-view--${uuidv4()}`;

const annotationStore = useAnnotationStore(properties.storeId);
const type = AnnotationTypeLabelValue[properties.annotationType];
const title =
  properties.mode === 'edit' ? `Edit ${type.label}` : `Create ${type.label}`;
const selectLabel =
  properties.mode === 'edit'
    ? `Adjust ${type.label} selection`
    : `Select ${type.label} selection`;

let annotatedText: AnnotatedText<W3CAnnotation>;
const annotation = ref<W3CAnnotation | null>(null);

onUnmounted(() => {
  annotatedText?.destroy();
});

const getMainAnnotation = () => {
  if (properties.parentAnnotation) return properties.parentAnnotation;
  if (properties.mode === 'edit') {
    return properties.parentAnnotation;
  }
  return properties.annotation;
};

const textPositionSelector = () => {
  const parent = getMainAnnotation();
  if (!parent) return null;

  const sourceUri = properties.source.uri;

  return findTextPositionSelector(sourceUri)(parent)?.selector;
};

onMounted(() => {
  annotation.value = properties.mode === 'edit' ? properties.annotation : null;
  const annotations = properties.mode === 'edit' ? [properties.annotation] : [];
  const language = properties.source.content.processingLanguage;
  const sourceUri = properties.source.uri;
  const text = properties.source.content.text;

  let selector = textPositionSelector();

  const limit = selector
    ? {
        start: selector.start,
        end: selector.end,
        ignoreLines: true,
      }
    : undefined;

  const type = properties.annotationType;
  const color = IdentifyColorMap[type ?? 'paragraph'];

  annotatedText = createAnnotatedText(id, {
    text: MarkdownTextAdapter({
      limit,
    }),
    annotation: W3CAnnotationAdapter({
      sourceUri: sourceUri,
      language: language,
      edit: true,
      create: properties.mode === 'create',
      snapper: new WordSnapper(),
      colorFn: (w3cAnnotation: W3CAnnotation) => color,
      // defaultRender: 'underline',
    }),
  })
    .setText(text, false)
    .setAnnotations(annotations)
    .on('annotation-create--end', ({ mouseEvent, event, data }) => {
      annotatedText.changeAnnotationAdapterConfig('create', false);
      annotatedText.changeAnnotationAdapterConfig('edit', true);
      annotation.value = data.annotation;
    })
    .on('annotation-update--end', ({ mouseEvent, event, data }) => {
      annotation.value = data.annotation;
    });
});

const onCancel = () => {
  emits('closeModal', null);
};

const onSubmit = async () => {
  const data = createSelection(
    annotation.value,
    properties.annotationType,
    properties.source,
    properties.schema,
    properties.extraData,
  );

  const annotationId = properties.annotation?.id ?? null;
  const result = await annotationStore.saveOrCreateAnnotation(
    annotationId,
    data,
  );

  emits('closeModal', { valid: true, data: result });
};

const disabled = computed(() => {
  // TODO if there is metadata needed validate it here!
  return !properties.valid || !annotation.value;
});

const selectAll = () => {
  const source = properties.source;
  const selector = textPositionSelector() ?? {
    start: 0,
    end: source.content.text.length,
  };
  if (annotation.value) {
    annotation.value = updateTextSelectionAnnotation(
      annotation.value,
      source.uri,
      source.content.processingLanguage,
      source.content.text,
      selector,
    );
  } else {
    annotation.value = createTextSelectionAnnotation(
      source.uri,
      source.content.processingLanguage,
      source.content.text,
      { ...selector, id: `NEW-${uuidv4()}` },
    );
  }

  annotatedText
    .setAnnotations([annotation.value])
    .changeAnnotationAdapterConfig('create', false)
    .changeAnnotationAdapterConfig('edit', true);
};
</script>
