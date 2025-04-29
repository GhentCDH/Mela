<template>
  <li>
    <div class="list-col-grow flex items-center gap-2">
      <div class="flex gap-2 items-center font-bold">
        <Icon
          :icon="IconEnum.Text"
          :size="Size.sm"
        />
        {{ source.content.label }}
      </div>
    </div>

    <ul class="w-full ml-8">
      <Tree
        v-for="annotation of annotationTree"
        :key="annotation.id"
        :property="annotation"
        :active-id="activeId"
        :level="1"
        @select-annotation="selectAnnotation"
        @delete-annotation="deleteAnnotation"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import { Icon, IconEnum, Size } from '@ghentcdh/ui';

import Tree from './tree.vue';
import { useActiveAnnotationStore } from '../store/active-annotation.store';
import { createAnnotationTree } from '../utils/tree';

const properties = defineProps<{
  annotations: W3CAnnotation[];
  source: SourceModel;
  storeId: string;
}>();

const store = useActiveAnnotationStore(properties.storeId);

const annotationTree = computed(() => {
  return createAnnotationTree(properties.source.uri, properties.annotations);
});

const selectAnnotation = (annotationId: string) => {
  store.selectAnnotation({
    annotationId,
    textContentUri: properties.source.uri,
  });
};
const deleteAnnotation = (annotationId: string) => {
  store.delete(annotationId);
};

const activeId = computed(() => {
  return store.activeAnnotation?.id ?? null;
});
</script>
