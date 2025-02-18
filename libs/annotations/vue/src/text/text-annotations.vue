<template>
  <div class="annotation-container">
    {{ actions }}
    <AnnotatedText
      :lines="lines"
      :annotations="annotationsForText"
      :selected-annotations="selectedAnnotations"
      :allow-create="actions?.create"
      @annotation-create-begin="onAnnotationCreateBegin"
      @annotation-create-end="onAnnotationCreateEnd"
      @aaaaannotation-creating="onAnnotationCreating"
      @annotation-click="onSelectAnnotation($event, true)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import type { MouseEventPayload } from '@ghentcdh/vue-component-annotated-text';
import { AnnotatedText } from '@ghentcdh/vue-component-annotated-text';
import '@ghentcdh/vue-component-annotated-text/style.css';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text/dist/src';

import { filterAnnotationsForText } from './utils/filter';
import { textToLines } from './utils/lines';
import type { AnnotationEmits } from '../model/emits';
import type { AnnotationActions, AnnotationConfig } from '../model/properties';

const properties = withDefaults(
  defineProps<{
    source: SourceModel;
    annotations: W3CAnnotation[];
    actions: AnnotationActions;
    selectedAnnotations: string[];
    config: AnnotationConfig;
  }>(),
  {
    selectedAnnotations: [] as string[],
    actions: { edit: false, create: false },
  },
);
const lines = computed(() => textToLines(properties.source.content.text));
const annotationsForText = computed(() =>
  filterAnnotationsForText(
    properties.annotations ?? [],
    properties.source.uri,
    properties.config,
  ),
);

const clickedOnAnnotation = ref(false);

const emits = defineEmits<AnnotationEmits>();

const onSelectAnnotation = (
  annotation: MouseEventPayload,
  isClicked: boolean,
) => {
  clickedOnAnnotation.value = true;
  if (!annotation.annotation) {
    emits('onEvent', 'click-outside', {
      target: properties.source.uri,
      annotationId: undefined,
      payload: { isClicked },
    });
    return;
  }

  emits('onEvent', 'click-annotation', {
    target: properties.source.uri,
    annotationId: annotation.annotation.id,
    payload: { isClicked },
  });
};

const onAnnotationCreateBegin = (event: CreateAnnotationState) => {
  event.init({});

  emits('onEvent', 'create--start', {
    target: properties.source.uri,
    // annotationId: event.annotation.id,
    payload: event,
  });
};

const onAnnotationCreateEnd = (event: CreateAnnotationState) => {
  const annotation = event.getAnnotation();

  emits('onEvent', 'create--end', {
    target: properties.source.uri,
    // annotationId: event.annotation.id,
    payload: event,
  });
};

const onAnnotationCreating = (event: CreateAnnotationState) => {
  emits('onEvent', 'create--changing', {
    target: properties.source.uri,
    // annotationId: event.annotation.id,
    payload: event,
  });
};
</script>
