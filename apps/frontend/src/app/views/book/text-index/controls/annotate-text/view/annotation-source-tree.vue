<template>
  <div class="mb-2">
    <div class="flex items-center gap-2 font-bold">
      <div class="gap-2 items-center">
        <Icon
          :icon="IconEnum.Text"
          size="sm"
        />
      </div>
      {{ source.content.label }}
    </div>
    <TreeView
      :data="tree"
      :active="activeAnnotationId"
      @select="select"
    />
  </div>
</template>

<script setup lang="ts">
import type { SourceModel } from '@mela/text/shared';
import { computed } from 'vue';

import { Icon, IconEnum, TreeView } from '@ghentcdh/ui';

import { useActiveAnnotationStore } from '../store/active-annotation.store';
import type { TreeProp } from '../utils/tree';

const properties = defineProps<{
  source: SourceModel;
  storeId: string;
  tree: TreeProp[];
}>();

const store = useActiveAnnotationStore(properties.storeId);

const activeAnnotationId = computed(() => store.activeAnnotation?.id ?? null);
const select = (annotation: TreeProp) => {
  store.selectAnnotation({
    annotationId: annotation.id,
    textContentUri: properties.source.uri,
  });
};

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
