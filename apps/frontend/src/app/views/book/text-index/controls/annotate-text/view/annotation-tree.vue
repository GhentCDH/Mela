<template>
  <MultiSelect
    v-model="filterType"
    label="Filter by type"
    :options="annotationTypes"
    label-key="label"
    value-key="id"
    @change="changeFilter"
  />
  <ul>
    <annotation-source-tree
      v-for="source in sources"
      :key="source.uri"
      :store-id="storeId"
      :source="source"
      :annotations="annotations"
    />
  </ul>
</template>

<script setup lang="ts">
import { type AnnotationMetadataType } from '@mela/text/shared';
import { ref, watch } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import type { Chapter } from '@ghentcdh/mela/generated/types';
import { MultiSelect } from '@ghentcdh/ui';

import AnnotationSourceTree from './annotation-source-tree.vue';
import { IdentifyColor } from '../../identify.color';
import type { AnnotationFilter } from '../utils/annotations.utils';

const annotationTypes = IdentifyColor;

const filterType = ref([]);

const properties = defineProps<{
  filter: AnnotationFilter;
  chapters: Chapter[];
  activeChapter: Chapter;
  annotations: W3CAnnotation[];
  sources: SourceModel[];
  storeId: string;
}>();

const emits = defineEmits<{
  changeFilter: [AnnotationFilter];
}>();

const changeFilter = () => {
  emits('changeFilter', {
    annotationType: filterType.value.map((f) => f.id as AnnotationMetadataType),
  });
};

watch(
  () => properties.filter,
  () => {
    filterType.value = properties.filter?.annotationType?.map(
      (f) => annotationTypes.find((a) => a.id === f) as any,
    );
  },
  { immediate: true },
);
</script>
