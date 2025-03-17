<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Selected text:</legend>
    {{ selectedText }}
  </fieldset>
  <SelectComponent
    v-model="metaDataModel.annotationType"
    label="Annotation type"
    :options="annotationTypes"
    :disabled="disabled"
    @change="changeMetadata"
  />

  <FormComponent
    v-if="isExample"
    id="registerForm"
    v-model="metaDataModel.example"
    :disabled="disabled"
    :schema="ExampleFormSchema.schema.form.schema"
    :uischema="ExampleFormSchema.schema.form.uiSchema"
    @change="changeMetadata"
  />
  <div class="flex gap-2 justify-end pb-4">
    <Btn :color="Color.error" @click="deleteAnnotation"> Delete</Btn>
    <Btn :disabled="!valid || disabled" @click="saveAnnotation"> Save</Btn>
  </div>
</template>

<script setup lang="ts">
import type { AnnotationSelector, AnnotationType } from '@mela/text/shared';
import {
  AnnotationExampleExampleSchema,
  AnnotationExampleSchema,
  AnnotationSelectorSchema,
  ExampleFormSchema,
  findExampleMetaData,
  getExampleIdFromUri,
} from '@mela/text/shared';
import { cloneDeep, isEqual, pick } from 'lodash-es';
import { computed, ref, watch } from 'vue';
import type { SafeParseReturnType } from 'zod/lib/types';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  findTagging,
  findTextPositionSelector,
} from '@ghentcdh/annotations/core';
import { FormComponent } from '@ghentcdh/json-forms/vue';
import { Btn, Color, ModalService, SelectComponent } from '@ghentcdh/ui';

import type { AnnotationMetadataModel } from './props';
import { IdentifyColor } from '../../identify.color';
import { useModeStore } from '../store/mode.store';
import { CREATE_MODES } from '../props';

const annotationTypes = IdentifyColor;

type Properties = {
  selectedText: string;
  annotation: W3CAnnotation;
  textContent: SourceModel;
};
const properties = defineProps<Properties>();
const emits = defineEmits<{
  save: [string | null, AnnotationType];
  delete: [W3CAnnotation];
}>();
const valid = ref(false);
const metaDataModel = ref<AnnotationMetadataModel>();
const modeStore = useModeStore();

const disabled = computed(
  () =>
    modeStore.activeMode &&
    !(
      modeStore.activeMode === 'edit' ||
      CREATE_MODES.includes(modeStore.activeMode)
    ),
);
const isExample = computed(() => {
  return metaDataModel.value.annotationType.id === 'example';
});

let changedMetadata: AnnotationType;
let originalMetaData: AnnotationMetadataModel;

const changeMetadata = () => {
  let annotationType: SafeParseReturnType<AnnotationType, AnnotationType>;
  const formValue = metaDataModel.value;

  let type: AnnotationSelector = {
    annotation: {
      ...formValue.annotation,
      tagging: formValue.annotationType.id,
    },
    textContent: pick(properties.textContent, ['id']),
  };

  if (isExample.value) {
    annotationType = AnnotationExampleSchema.safeParse({
      ...type,
      example: formValue.example,
    });
  } else {
    annotationType = AnnotationSelectorSchema.safeParse(type);
  }

  changedMetadata = annotationType.data;
  valid.value = annotationType.success;

  if (
    !modeStore.activeMode &&
    !isEqual(originalMetaData, metaDataModel.value)
  ) {
    modeStore.changeMode('edit');
  }
};

const saveAnnotation = () => {
  emits('save', properties.annotation.id, changedMetadata);
};

const exampleMetaData = computed(() =>
  findExampleMetaData(properties.annotation),
);

const deleteAnnotation = () => {
  ModalService.showConfirm({
    title: 'Delete annotation',
    message: 'Are you sure to delete this annotation, all links will be lost?',
    onClose: (result) => {
      if (result.confirmed) {
        emits('delete', properties.annotation);
      }
    },
  });
};

// region datamodel
watch(
  () => properties.annotation,
  (n) => {
    // modeStore.resetMode();
    const annotation = properties.annotation;
    const type = findTagging(annotation).value ?? 'phrase';

    const annotationType =
      IdentifyColor.find((c) => c.id === type) ?? IdentifyColor[0];

    const example = exampleMetaData?.value?.value
      ? {
          ...AnnotationExampleExampleSchema.parse(exampleMetaData.value.value),
          id: getExampleIdFromUri(exampleMetaData.value.source),
        }
      : { register: {} };

    originalMetaData = {
      annotationType: annotationType,
      example: example,
      annotation: {
        // TODO check if new id
        id: properties.annotation.id,
        tagging: annotationType.id,
        ...findTextPositionSelector(properties.textContent.uri)(
          properties.annotation,
        )?.selector,
      },
    };

    metaDataModel.value = cloneDeep(originalMetaData);

    changeMetadata();
  },
  { immediate: true },
);
// endregion
</script>
