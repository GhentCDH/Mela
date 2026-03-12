<template>
  <Filter
    title="Annotation filter"
    :items="items"
    v-model="store.selectedAnnotationTypes"
    color-key="color"
    @change="updateValue"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Filter } from '@ghentcdh/ui';
import { type AnnotationType } from '../../text-index/controls/identify.color';
import { useAnnotationStore } from '../store/anntotation.store';
import { useAnnotationDefStore } from '../store/annotation-def.store';
import { findPurposeLowerCase } from '../../../../style/annotation.style';

const properties = defineProps<{
  storeId: string;
}>();

const annotationDefStore = useAnnotationDefStore();

const store = useAnnotationStore(properties.storeId);
const selectedTypes = store.selectedAnnotationTypes;

const annotationCounts = computed(() => {
  const counts: Record<string, number> = {};
  const annotations = store.annotations;
  if (!annotations) return counts;
  for (const annotation of annotations) {
    const purpose = findPurposeLowerCase(annotation) as string;
    counts[purpose] = (counts[purpose] ?? 0) + 1;
  }
  return counts;
});

const items = computed(() => {
  const counts = annotationCounts.value;
  return annotationDefStore.definitions.map((def) => {
    return {
      id: def.id as AnnotationType,
      label: def.label,
      color: def.style.default?.backgroundColor,
      count: counts[def.id] ?? 0,
    };
  });
});
</script>
