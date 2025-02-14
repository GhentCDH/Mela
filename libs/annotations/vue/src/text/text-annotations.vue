<script setup lang="ts">
import { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import { AnnotatedText } from '@ghentcdh/vue-component-annotated-text';
import '@ghentcdh/vue-component-annotated-text/style.css';

import { computed, ref } from 'vue';
import { textToLines } from './utils/lines';
import { filterAnnotations } from '../utils/filter-annotations';
import { filterAnnotationsForText } from './utils/filter';

const properties = defineProps<{
  source: SourceModel;
  annotations: W3CAnnotation[];
}>();
const lines = computed(() => textToLines(properties.source.content.text));
const annotationsForText = computed(() =>
  filterAnnotationsForText(properties.annotations ?? [], properties.source.uri),
);
</script>

<template>
  <AnnotatedText :lines="lines" :annotations="annotationsForText" />
</template>
