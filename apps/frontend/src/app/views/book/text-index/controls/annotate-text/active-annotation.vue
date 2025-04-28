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
      :store-id="storeId"
      :annotation="activeAnnotation"
      :source="textContent"
    />
    <template v-if="children.length">
      <hr class="text-gray-300 my-2" />
      <div class="flex gap-2 flex-wrap">
        <Btn
          v-for="child in children"
          :key="child.key"
          @click="createAnnotation(child.key)"
        >
          Create {{ child.label }}
        </Btn>
      </div>
    </template>
    <hr v-if="isExample" class="text-gray-300 my-2" />
    <LinkLemma
      v-if="isExample"
      :annotation="activeAnnotation"
      :links="links"
      :text-content="textContent"
      :store-id="storeId"
    />
    <hr v-if="isExample" class="text-gray-300 my-2" />
    <LinkBuckets
      v-if="isExample"
      :annotation="activeAnnotation"
      :links="links"
      :text="text"
      :store-id="storeId"
      @change-select-filter="emits('changeSelectFilter', $event)"
    />

    <hr class="text-gray-300 my-2" />

    <Translations
      v-if="canTranslate"
      :annotation="activeAnnotation"
      :links="links"
      :text="text"
      :store-id="storeId"
    />
  </Card>
</template>

<script setup lang="ts">
import type { AnnotationType } from '@mela/text/shared';
import { computed } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import { findTagging } from '@ghentcdh/annotations/core';
import type { Text } from '@ghentcdh/mela/generated/types';
import { Btn, Card, Color, IconEnum } from '@ghentcdh/ui';

import type { AnnotationWithRelations } from './props';
import { AnnotationTypeLabelValue } from '../identify.color';
import type { AnnotationFilter } from './utils/annotations.utils';
import { treeOrder } from './utils/tree';
import AnnotationMetadata from './view/annotation-metadata.vue';
import LinkBuckets from './view/link-buckets.vue';
import LinkLemma from './view/link-lemma.vue';
import { ModalSelectionService } from './view/selection/modal-selection.service';
import Translations from './view/translations.vue';

type Properties = {
  storeId: string;
  activeAnnotation: W3CAnnotation;
  links: AnnotationWithRelations[];
  text: Text;
  textContent: SourceModel;
};
const properties = defineProps<Properties>();

const emits = defineEmits<{
  changeSelectFilter: [Partial<AnnotationFilter>];
  closeAnnotation: [];
}>();

const annotationType = computed(
  () => findTagging(properties.activeAnnotation).value ?? 'phrase',
);

const children = computed(() => {
  return treeOrder[annotationType.value]
    .filter((t) => t !== 'lemma')
    .map((child) => AnnotationTypeLabelValue[child]);
});
const isExample = computed(() => annotationType.value === 'example');
const canTranslate = computed(() => annotationType.value !== 'lemma');

const closeAnnotation = async () => {
  emits('closeAnnotation');
};

const createAnnotation = (annotationType: AnnotationType) => {
  ModalSelectionService.createSelection({
    annotation: properties.activeAnnotation,
    textContent: properties.textContent,
    annotationType,
    storeId: properties.storeId,
  });
};
</script>
