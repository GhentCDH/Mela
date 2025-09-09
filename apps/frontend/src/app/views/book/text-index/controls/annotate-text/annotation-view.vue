<template>
  <div :id="id" />
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { onMounted, onUnmounted, watch } from 'vue';

import type {
  AnnotatedText,
  SourceModel,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import {
  MarkdownTextAdapter,
  W3CAnnotationAdapter,
  createAnnotatedText,
} from '@ghentcdh/annotated-text';
import { findTagging } from '@ghentcdh/annotations/core';

import {
  colorForAnnotationType,
  isParagraphAnnotationType,
} from '../identify.color';
import { useActiveAnnotationStore } from './store/active-annotation.store';
import { useAnnotationListenerStore } from './store/annotation-listener.store';
import { useAnnotationStore } from './store/annotation.store';
import { useModeStore } from './store/mode.store';

type Properties = {
  source: SourceModel;
  annotations: W3CAnnotation[];
  selectedAnnotations?: string[];
  storeId: string;
};
const id = `annotated-view--${uuidv4()}`;
const properties = defineProps<Properties>();
let annotatedText: AnnotatedText<W3CAnnotation>;

onMounted(() => {
  annotatedText = createAnnotatedText(id, {
    text: MarkdownTextAdapter(),
    annotation: W3CAnnotationAdapter({
      sourceUri: properties.source.uri,
      // TODO add annotation colors
      colorFn: colorForAnnotationType,
      defaultRender: 'underline',
      gutterFn: isParagraphAnnotationType,
      tagConfig: {
        enabled: true,
        tagFn: (w3cAnnotation: W3CAnnotation) => {
          const type = findTagging(w3cAnnotation);
          if (!type || type.value === 'paragraph') {
            return '';
          }
          return type.value;
        },
      },
    }),
  })
    .setText(properties.source.content.text, false)
    .setAnnotations(properties.annotations)
    .selectAnnotations(properties.selectedAnnotations ?? [])
    .on('click', onSelectAnnotation.bind(true));
});

watch(
  () => properties.source,
  (newVal, oldVal) => {
    // annotatedText.setText(properties.source.content.text);
  },
);
watch(
  () => properties.annotations,
  (newVal, oldVal) => {
    annotatedText.setAnnotations(newVal);
  },
);
watch(
  () => properties.selectedAnnotations,
  (newVal, oldVal) => {
    annotatedText.selectAnnotations(newVal ?? []);
  },
);

//#region select annotation
const listenerStore = useAnnotationListenerStore()();
const annotationStore = useAnnotationStore(properties.storeId);
const modeStore = useModeStore();
const activeAnnotationStore = useActiveAnnotationStore(properties.storeId);

// TODO if you click somewhere else also deselect the annotation
const onSelectAnnotation = async ({ data }) => {
  const annotationId = data.annotation.id;

  listenerStore.onClickAnnotation(annotationStore.getAnnotation(annotationId));

  if (modeStore.activeMode) {
    return;
  }

  const confirmed = { confirmed: true };

  if (!confirmed.confirmed) return;

  activeAnnotationStore.selectAnnotation({
    textContentUri: properties.source.uri,
    annotationId,
  });
};

//#endregion
onUnmounted(() => {
  annotatedText?.destroy();
});
</script>
