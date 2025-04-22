<template>
  <MultiSelect
    v-model="filterType"
    label="Filter by type"
    :options="annotationTypes"
    label-key="label"
    value-key="id"
    @change="changeFilter"
  />
</template>

<script setup lang="ts">
import { type AnnotationMetadataType } from '@mela/text/shared';
import { ref, watch } from 'vue';

import { MultiSelect } from '@ghentcdh/ui';

import { IdentifyColor } from '../../identify.color';
import type { AnnotationFilter } from '../utils/annotations.utils';

const annotationTypes = IdentifyColor;

const filterType = ref([]);

const properties = defineProps<{
  filter: AnnotationFilter;
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
