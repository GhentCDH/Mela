<template>
  <Card>
    <template #title>
      <div class="w-full flex justify-end">
        <Btn
          :color="Color.secondary"
          :icon="IconEnum.Close"
          @click="closeAnnotation()"
        />
      </div>
    </template>
    <AnnotationMetadata
      :annotation="activeAnnotation"
      :selected-text="selectedText"
      :text-content="textContent"
      :disabled="disableEditMetaData"
      @save="saveAnnotation"
      @delete="deleteAnnotationAndClose"
    />

    <Translations
      :annotation="activeAnnotation"
      :links="links"
      :text="text"
      @save="saveAnnotation"
      @delete="deleteAnnotation"
    />
  </Card>
</template>

<script setup lang="ts">
import { AnnotationType, findExampleMetaData } from '@mela/text/shared';
import { computed, ref } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import { findTextPositionSelector } from '@ghentcdh/annotations/core';
import { Btn, Card, Color, IconEnum } from '@ghentcdh/ui';

import { IdentifyColor } from '../identify.color';
import type { AnnotationWithRelations } from './props';
import { useModeStore } from './store/mode.store';
import type { TextWithAnnotations } from './utils/text';
import { getTextSelection } from './utils/translation';
import AnnotationMetadata from './view/annotation-metadata.vue';
import annotationMetadata from './view/annotation-metadata.vue';
import Translations from './view/translations.vue';

const annotationType = ref<{ label: string; id: string }>(IdentifyColor[0]);

type Properties = {
  textWithAnnotations: TextWithAnnotations;
  activeAnnotation: W3CAnnotation;
  links: AnnotationWithRelations[];
  text: Text;
  textContent: SourceModel;
};
const properties = defineProps<Properties>();

const emits = defineEmits<{
  changeAnnotation: [W3CAnnotation];
  deleteAnnotation: [W3CAnnotation];
  saveAnnotation: [string | null, AnnotationType];
  closeAnnotation: [];
}>();

const disableEditMetaData = computed(
  () => modeStore.activeMode && modeStore.activeMode !== 'edit',
);

const deleteAnnotation = (annotation: W3CAnnotation) => {
  emits('deleteAnnotation', annotation);
};
const deleteAnnotationAndClose = (annotation: W3CAnnotation) => {
  deleteAnnotation(annotation);
  closeAnnotation();
};

const saveAnnotation = (id: null | string, annotation: AnnotationType) => {
  emits('saveAnnotation', id, annotation);
};

const textAnnotation = computed(() => ({
  id: properties.activeAnnotation.id,
  ...findTextPositionSelector(properties.textContent.uri)(
    properties.activeAnnotation,
  )?.selector,
}));
const selectedText = computed(() =>
  getTextSelection(properties.textContent, textAnnotation.value),
);
const exampleMetaData = computed(() =>
  findExampleMetaData(properties.activeAnnotation),
);

const closeAnnotation = async () => {
  emits('closeAnnotation');
};

// region Validation
const valid = ref(false);
const modeStore = useModeStore();

const onValid = (value: boolean) => {
  valid.value = value;
  console.log('valid');
  if (!valid) {
    modeStore.changeMode('edit');
  }
};
// endregion
</script>
