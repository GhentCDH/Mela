<template>
  <MultiSelect
    v-model="filterType"
    label="Filter by type"
    :options="annotationTypes"
    label-key="label"
    value-key="key"
    @change="changeFilter"
  />
  <annotation-source-tree
    v-for="tree in annotationTreeStore.trees"
    :key="tree.source.uri"
    :store-id="storeId"
    :source="tree.source"
    :tree="tree.tree"
    :annotations="annotations"
  />
</template>

<script setup lang="ts">
import type { AnnotationMetadataType, SourceModel } from '@mela/text/shared';
import { ref, watch } from 'vue';

import type { W3CAnnotation } from '@ghentcdh/annotated-text';
import type { Chapter } from '@ghentcdh/mela/generated/types';
import { MultiSelect } from '@ghentcdh/ui';

import AnnotationSourceTree from './annotation-source-tree.vue';
import { AnnotationTypeLabelValues } from '../../identify.color';
import { useAnnotationTreeStore } from '../store/annotation.tree.store';
import type { AnnotationFilter } from '../utils/annotations.utils';

const annotationTypes = AnnotationTypeLabelValues;

const filterType = ref([]);

const properties = defineProps<{
  filter: AnnotationFilter;
  chapters: Chapter[];
  activeChapter: Chapter;
  annotations: W3CAnnotation[];
  sources: SourceModel[];
  storeId: string;
}>();

const annotationTreeStore = useAnnotationTreeStore(properties.storeId);

const emits = defineEmits<{
  changeFilter: [AnnotationFilter];
}>();

const changeFilter = () => {
  emits('changeFilter', {
    annotationType: filterType.value.map(
      (f) => f.key as AnnotationMetadataType,
    ),
  });
};

watch(
  () => properties.filter,
  () => {
    filterType.value = properties.filter?.annotationType?.map(
      (f) => annotationTypes.find((a) => a.key === f) as any,
    );
  },
  { immediate: true },
);
</script>
