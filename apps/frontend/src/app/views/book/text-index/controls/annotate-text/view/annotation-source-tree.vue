<template>
  <li>
    <div class="list-col-grow flex items-center gap-2">
      <div class="flex gap-2 items-center font-bold">
        <Icon
          :icon="IconEnum.Text"
          size="sm"
        />
        {{ source.content.label }}
      </div>
    </div>

    <ul class="w-full ml-8">
      <Tree
        v-for="annotation of tree"
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

import type { SourceModel } from '@ghentcdh/annotations/core';
import { Icon, IconEnum } from '@ghentcdh/ui';

import Tree from './tree.vue';
import { useActiveAnnotationStore } from '../store/active-annotation.store';
import type { TreeProp } from '../utils/tree';

const properties = defineProps<{
  source: SourceModel;
  storeId: string;
  tree: TreeProp[];
}>();

const store = useActiveAnnotationStore(properties.storeId);

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
