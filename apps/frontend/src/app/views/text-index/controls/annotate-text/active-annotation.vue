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
    <hr
      v-if="isExample"
      class="text-gray-300 my-2"
    >
    <LinkLema
      v-if="isExample"
      :annotation="activeAnnotation"
      :links="links"
      :text="text"
      :text-content="textContent"
      @save="saveAnnotation"
      @delete="deleteAnnotation"
    />
    <hr
      v-if="isExample"
      class="text-gray-300 my-2"
    >
    <LinkBuckets
      v-if="isExample"
      :annotation="activeAnnotation"
      :links="links"
      :text="text"
      @save="saveAnnotation"
      @delete="deleteAnnotation"
      @change-select-filter="emits('changeSelectFilter', $event)"
    />

    <hr class="text-gray-300 my-2">

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

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  findTagging,
  findTextPositionSelector,
} from '@ghentcdh/annotations/core';
import type { Text } from '@ghentcdh/mela/generated/types';
import { Btn, Card, Color, IconEnum } from '@ghentcdh/ui';

import type { AnnotationWithRelations } from './props';
import type { AnnotationFilter } from './utils/annotations.utils';
import { getTextSelection } from './utils/translation';
import AnnotationMetadata from './view/annotation-metadata.vue';
import LinkBuckets from './view/link-buckets.vue';
import LinkLema from './view/link-lema.vue';
import Translations from './view/translations.vue';

type Properties = {
  activeAnnotation: W3CAnnotation;
  links: AnnotationWithRelations[];
  text: Text;
  textContent: SourceModel;
};
const properties = defineProps<Properties>();

const emits = defineEmits<{
  deleteAnnotation: [W3CAnnotation];
  saveAnnotation: [string | null, AnnotationType];
  changeSelectFilter: [Partial<AnnotationFilter>];
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
  console.log('saveAnnotation', id, annotation);
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
