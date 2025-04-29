<template>
  <li>
    <div class="list-col-grow flex items-center gap-2">
      <div class="font-thin opacity-30" />
      <div>{{ source.type }}</div>
    </div>

    <ul class="menu w-full">
      <Tree
        v-for="annotation of annotationTree"
        :key="annotation.id"
        :property="annotation"
        @select-annotation="selectAnnotation"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';

import Tree from './tree.vue';
import { createAnnotationTree } from '../utils/tree';
import { useActiveAnnotationStore } from '../store/active-annotation.store';

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
</script>
