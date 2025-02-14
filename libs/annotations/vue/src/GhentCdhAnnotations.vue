<script setup lang="ts">
import { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import TextAnnotations from './text/text-annotations.vue';
import { computed } from 'vue';

const properties = withDefaults(
  defineProps<{
    sources: SourceModel[];
    annotations: W3CAnnotation[];
    cols: number;
  }>(),
  { cols: 1 },
);

const gridColumns = computed(() => ({
  'grid-template-columns': `repeat(${properties.cols}, 1fr)`,
}));
</script>

<template>
  <div :class="['grid gap-2']" :style="gridColumns">
    <template v-for="source in sources" :key="source.uri">
      <div>
        <text-annotations :source="source" :annotations="annotations" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
