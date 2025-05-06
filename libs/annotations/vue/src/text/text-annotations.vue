<template>
  <div class="annotation-container">
    <AnnotatedText
      :lines="lines"
      :annotations="annotationsForText"
      :selected-annotations="selectedAnnotations"
      :allow-create="actions?.create"
      :allow-edit="actions?.edit"
      @annotation-create-begin="onAnnotationCreateBegin"
      @annotation-creating="onAnnotationCreating"
      @annotation-create-end="onAnnotationCreateEnd"
      @annotation-click="onSelectAnnotation($event, true)"
      @annotation-update-begin="onAnnotationUpdateBegin"
      @annotation-updating="onAnnotationUpdating"
      @annotation-update-end="onAnnotationUpdateEnd"
    />
  </div>
</template>

<script setup lang="ts">
import { cloneDeep } from 'lodash-es';
import { computed, ref } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import type {
  CreateAnnotationState,
  MouseEventPayload,
  UpdateAnnotationState,
} from '@ghentcdh/vue-component-annotated-text';
import { AnnotatedText } from '@ghentcdh/vue-component-annotated-text';
import '@ghentcdh/vue-component-annotated-text/style.css';

import { filterAnnotationsForText } from './utils/filter';
import { textToLines } from './utils/lines';
import type { AnnotationEmits, AnnotationEventType } from '../model/emits';
import type { AnnotationActions, AnnotationConfig } from '../model/properties';
import type { UseSnapper } from '../snapper';
import { fixOffset } from './utils/fix-offset';

const properties = withDefaults(
  defineProps<{
    source: SourceModel;
    annotations: W3CAnnotation[];
    actions?: AnnotationActions;
    selectedAnnotations?: string[];
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
    properties.source,
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

  emitEvent('create--start', event);
};

const onAnnotationCreateEnd = (event: CreateAnnotationState) => {
  emitEvent('create--end', event, true);
};

const onAnnotationCreating = (event: CreateAnnotationState) => {
  fixOffset(event, snapper, 'updateCreating');
  emits('onEvent', 'create--changing', {
    target: properties.source.uri,
    // annotationId: event.annotation.id,
    payload: event,
  });
  emitEvent('update--start', event);
};

const onAnnotationUpdateBegin = (event: UpdateAnnotationState) => {
  // event.init({});
  fixOffset(event, snapper, 'confirmStartUpdating');

  emitEvent('update--start', event);
};

const onAnnotationUpdateEnd = (event: UpdateAnnotationState) => {
  // TODO remove this when update of the dependency

  event.getAnnotation = () => {
    return cloneDeep(event!.annotation);
  };
  emitEvent('update--end', event);
};

const onAnnotationUpdating = (event: UpdateAnnotationState) => {
  fixOffset(event, snapper, 'confirmUpdate');
  emitEvent('update--changing', event);
};

const emitEvent = <PAYLOAD extends any>(
  type: AnnotationEventType,
  payload: CreateAnnotationState | UpdateAnnotationState,
) => {
  payload.getAnnotation = () => {
    const cloned = cloneDeep(payload.annotation);
    const offset = properties.source.content.offset;
    if (offset) {
      cloned.start += offset;
      cloned.end += offset;
    }

    return cloned;
  };

  emits('onEvent', type, {
    target: properties.source.uri,
    annotationId: payload.annotation.id ?? null,
    payload,
  });
};
</script>
