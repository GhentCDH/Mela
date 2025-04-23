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
    <li
      v-for="chapter in chapters"
      :key="chapter.id"
    >
      <div class="list-col-grow flex items-center gap-2">
        <div class="font-thin opacity-30">
          {{ chapter.chapter_number }}
        </div>
        <div>{{ chapter.name }}</div>
      </div>

      <ul
        v-if="chapter.id === activeChapter?.id"
        class="menu"
      >
        <Tree
          v-for="annotation of annotationTree"
          :key="annotation.id"
          :property="annotation"
          @select-annotation="
            emits('select-annotation', $event, sources?.[0].uri)
          "
        />
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type AnnotationMetadataType } from '@mela/text/shared';
import { computed, ref, watch } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import type { Chapter } from '@ghentcdh/mela/generated/types';
import { MultiSelect } from '@ghentcdh/ui';

import Tree from './tree.vue';
import { IdentifyColor } from '../../identify.color';
import type { AnnotationFilter } from '../utils/annotations.utils';
import { createAnnotationTree } from '../utils/tree';

const annotationTypes = IdentifyColor;

const filterType = ref([]);

const properties = defineProps<{
  filter: AnnotationFilter;
  chapters: Chapter[];
  activeChapter: Chapter;
  annotations: W3CAnnotation[];
  sources: SourceModel[];
}>();

const emits = defineEmits<{
  changeFilter: [AnnotationFilter];
  selectAnnotation: [string];
}>();

const changeFilter = () => {
  emits('changeFilter', {
    annotationType: filterType.value.map((f) => f.id as AnnotationMetadataType),
  });
};

const annotationTree = computed(() => {
  return createAnnotationTree(
    properties.sources?.[0].uri,
    properties.annotations,
  );
});

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
