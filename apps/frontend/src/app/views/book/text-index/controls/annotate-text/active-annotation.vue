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
    <template v-if="isNew">
      <NotificationMessage
        message="Save the new annotations before more actions can be performed"
        type="warning"
      />
    </template>
    <template v-else>
      <template v-if="children.length">
        <hr class="text-gray-300 my-2" />
        <div class="flex gap-2 flex-wrap">
          <Btn
            v-for="child in children"
            :key="child.key"
            :outline="true"
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
        :source="textContent"
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
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { AnnotationType, SourceModel } from '@mela/text/shared';
import { computed } from 'vue';

import type { W3CAnnotation } from '@ghentcdh/annotated-text';
import { findTagging } from '@ghentcdh/annotated-text';
import type { Text } from '@mela/generated-types';
import { Btn, Card, Color, IconEnum, NotificationMessage } from '@ghentcdh/ui';

import type { AnnotationWithRelations } from './props';
import { AnnotationTypeLabelValue } from '../identify.color';
import type { AnnotationFilter } from './utils/annotations.utils';
import { AnnotationTester } from './utils/tester';
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
const isNew = computed(() => {
  return AnnotationTester(properties.activeAnnotation).isNew();
});
const createAnnotation = (annotationType: AnnotationType) => {
  ModalSelectionService.createSelection({
    parentAnnotation: properties.activeAnnotation,
    source: properties.textContent,
    annotationType,
    storeId: properties.storeId,
  });
};
</script>
