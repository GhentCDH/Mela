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
      @save="saveAnnotation"
      @delete="deleteAnnotationAndClose"
    />
    <hr class="text-gray-300 my-2" v-if="isExample" />
    <LinkBuckets
      v-if="isExample"
      :annotation="activeAnnotation"
      :links="links"
      :text="text"
      @save="saveAnnotation"
      @delete="deleteAnnotation"
    />

    <hr class="text-gray-300 my-2" />

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
import type { AnnotationType } from '@mela/text/shared';
import { computed } from 'vue';

import {
  findTagging,
  findTextPositionSelector,
  SourceModel,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';
import { Btn, Card, Color, IconEnum } from '@ghentcdh/ui';

import type { AnnotationWithRelations } from './props';
import type { TextWithAnnotations } from './utils/text';
import { getTextSelection } from './utils/translation';
import AnnotationMetadata from './view/annotation-metadata.vue';
import Translations from './view/translations.vue';
import LinkBuckets from './view/link-buckets.vue';

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

const annotationType = computed(
  () => findTagging(properties.activeAnnotation).value ?? 'phrase',
);
const isExample = computed(() => annotationType.value === 'example');

const textAnnotation = computed(() => ({
  id: properties.activeAnnotation.id,
  ...findTextPositionSelector(properties.textContent.uri)(
    properties.activeAnnotation,
  )?.selector,
}));
const selectedText = computed(() =>
  getTextSelection(properties.textContent, textAnnotation.value),
);

const closeAnnotation = async () => {
  emits('closeAnnotation');
};
</script>
