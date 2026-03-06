<template>
  <Modal
    :modal-title="label.title"
    :open="true"
    :disable-close="false"
    width="lg"
    @close-modal="onCancel"
  >
    <template #content>
      <ControlWrapper
        :label="label.selectLabel"
        :error="false"
        :required="true"
        width="full"
      >
        <div class="border border-1 border-gray-200 my-2 text-lg">
          <div :id="id" />
          <Btn :outline="true" class="mt-2" @click="selectAll">
            Select all text
          </Btn>
        </div>
      </ControlWrapper>
      <FormComponent
        v-if="formValidation"
        :id="`annotation-selection-modal-${id}`"
        v-model="formData"
        :schema="formValidation.jsonSchema"
        :uischema="formValidation.uiSchema"
        @valid="onValid($event)"
        @change="onChange"
        @errors="onErrors"
      />
      {{ formData }}
      <div class="flex gap-2 items-center">
        <slot name="custom-content" />
      </div>
    </template>
    <template #actions>
      <Btn :color="Color.secondary" :outline="true" @click="onCancel">
        Cancel
      </Btn>
      <slot name="custom-actions" />
      <Btn :disabled="disabled" @click="onSubmit"> Save </Btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { AnnotationSelectorSchema } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';
import { computed, onMounted, onUnmounted, ref } from 'vue';

import {
  AnnotatedText,
  createAnnotatedText,
  createTextSelectionAnnotation,
  findTextPositionSelector,
  MarkdownTextAdapter,
  updateTextSelectionAnnotation,
  W3CAnnotation,
  W3CAnnotationAdapter,
  WordSnapper,
} from '@ghentcdh/annotated-text';
import { Btn, Color, ControlWrapper, Modal } from '@ghentcdh/ui';

import { FormComponent } from '@ghentcdh/json-forms-vue';
import type { AnnotationSelectionModalProps } from './annotation-selection-modal.props';
import { createSelection } from './selection.utils';
import { defaultStyle } from '../../../../../../../style/annotation.style';
import { useAnnotationStore } from '../../../../../annotation/store/anntotation.store';
import { useAnnotationDefStore } from '../../../../../annotation/store/annotation-def.store';
import { getMetadata } from '../../../../../annotation/utils/metadata';

const formData = ref({});

const onValid = (valid: boolean) => {
  console.log('valid', valid);
};
const onChange = (data: any) => {};
const onErrors = (errors: any) => {};

const annotationDefStore = useAnnotationDefStore();
const formValidation = computed(() => {
  const validation =
    annotationDefStore.schemaDefinitions[properties.annotationType];
  console.log(properties.annotationType);
  console.log('validation', validation);
  if (!validation.uiSchema) return null;

  return validation;
});

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

const label = computed(() => {
  const _label = annotationDefStore.labels[properties.annotationType];
  console.log(properties.annotationType, _label);

  return {
    title: properties.mode === 'edit' ? `Edit ${_label}` : `Create ${_label}`,
    selectLabel:
      properties.mode === 'edit'
        ? `Adjust ${_label} selection`
        : `Select ${_label} selection`,
  };
});

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

  return findTextPositionSelector(sourceUri)(parent);
};

onMounted(() => {
  formData.value = getMetadata(
    properties.annotation,
    annotationDefStore.schemaDefinitions[properties.annotationType],
  );
  annotation.value = properties.mode === 'edit' ? properties.annotation : null;
  const annotations = properties.mode === 'edit' ? [properties.annotation] : [];
  const language = properties.source.content.processingLanguage;
  const sourceUri = properties.source.uri;
  const textDirection = properties.source.content.textDirection;
  const text = properties.source.content.text;

  let selector = textPositionSelector();

  const limit = selector
    ? {
        start: selector.start,
        end: selector.end,
        ignoreLines: true,
      }
    : undefined;
  // colorFn: ((w3cAnnotation: W3CAnnotation) => color,
  annotatedText = createAnnotatedText<W3CAnnotation>(id)
    .setTextAdapter(MarkdownTextAdapter({ limit, textDirection }))
    .setAnnotationAdapter(
      W3CAnnotationAdapter({
        sourceUri,
        language,
        edit: true,
        create: properties.mode === 'create',
      }),
    )
    .setSnapper(new WordSnapper())
    .setStyleParams({
      styleFn: defaultStyle,
    })
    .registerStyles(useAnnotationDefStore().styles)
    .setText(text)
    .setAnnotations(annotations)
    .on('annotation-create--end', ({ mouseEvent, event, data }) => {
      annotatedText.setAnnotationAdapter({ create: false, edit: true });
      annotation.value = data.annotation;
    })
    .on('annotation-edit--end', ({ mouseEvent, event, data }) => {
      annotation.value = data.annotation;
    });
});

const onCancel = () => {
  emits('closeModal', null);
};

const onSubmit = async () => {
  const value = formValidation.value
    ? formValidation.value.validation(formData.value)
    : {};
  const data = createSelection(
    annotation.value,
    properties.annotationType,
    properties.source,
    properties.schema,
    value,
    // properties.extraData,
  );

  const annotationId = properties.annotation?.id ?? null;
  const result = await annotationStore.saveOrCreateAnnotation(
    annotationId,
    data,
  );

  emits('closeModal', { valid: true, data: result });
};

const disabled = computed(() => {
  return false;
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
    .setAnnotationAdapter({ create: false, edit: true });
};
</script>
