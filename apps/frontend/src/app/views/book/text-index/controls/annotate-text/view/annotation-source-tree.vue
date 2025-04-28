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
        @select-annotation="emits('select-annotation', $event, source.uri)"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';

import Tree from './tree.vue';
import { createAnnotationTree } from '../utils/tree';

const properties = defineProps<{
  annotations: W3CAnnotation[];
  source: SourceModel;
}>();

const emits = defineEmits<{
  selectAnnotation: [string, string];
}>();

const annotationTree = computed(() => {
  return createAnnotationTree(properties.source.uri, properties.annotations);
});
</script>
