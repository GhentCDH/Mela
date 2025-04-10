<template>
  <div class="annotation-container">
    <AnnotatedText
      :lines="lines"
      :annotations="annotationsForText"
      :selected-annotations="selectedAnnotations"
      :allow-create="actions?.create"
      :use-snapper="useWordSnapper"
      @annotation-create-begin="onAnnotationCreateBegin"
      @annotation-creating="onAnnotationCreating"
      @annotation-create-end="onAnnotationCreateEnd"
      @annotation-click="onSelectAnnotation($event, true)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import type {
  CreateAnnotationState,
  MouseEventPayload,
} from '@ghentcdh/vue-component-annotated-text';
import { AnnotatedText } from '@ghentcdh/vue-component-annotated-text';
import '@ghentcdh/vue-component-annotated-text/style.css';

import { filterAnnotationsForText } from './utils/filter';
import { textToLines } from './utils/lines';
import type { AnnotationEmits } from '../model/emits';
import type { AnnotationActions, AnnotationConfig } from '../model/properties';
import type { UseSnapper} from '../snapper';
import { useWordSnapper } from '../snapper';
import { fixOffset } from './utils/fix-offset';

const properties = withDefaults(
  defineProps<{
    source: SourceModel;
    annotations: W3CAnnotation[];
    actions: AnnotationActions;
    selectedAnnotations: string[];
    config: AnnotationConfig;
    useSnapper?: UseSnapper<any>;
  }>(),
  {
    selectedAnnotations: [] as string[],
    actions: { edit: false, create: false } as AnnotationConfig,
    useSnapper: undefined,
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
const snapper = properties.useSnapper?.initSnapper(
  properties.source.content.text,
);

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
  emits('onEvent', 'create--end', {
    target: properties.source.uri,
    // annotationId: event.annotation.id,
    payload: event,
  });
};

const onAnnotationCreating = (event: CreateAnnotationState) => {
  fixOffset(event, snapper, 'updateCreating');
  emits('onEvent', 'create--changing', {
    target: properties.source.uri,
    // annotationId: event.annotation.id,
    payload: event,
  });
};
</script>
