<template>
  <div :class="['grid gap-2']" :style="gridColumns">
    <template v-for="source in sources" :key="source.uri">
      <div>
        <text-annotations
          :source="source"
          :useSnapper="useSnapper"
          :annotations="annotations"
          :actions="annotationActions?.[source.uri]"
          :selected-annotations="selectedAnnotations?.[source.uri]"
          :config="config ?? {}"
          :annotation-actions
          @on-event="onEvent"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';

import type {
  AnnotationActions,
  AnnotationConfig,
  AnnotationEmits,
  AnnotationEventHandlerPayloadData,
  AnnotationEventType
} from './model';
import TextAnnotations from './text/text-annotations.vue';
import { hasCustomEventListener } from './utils/hasCustomEventListener';
import { UseSnapper } from './snapper';

const properties = withDefaults(
  defineProps<{
    sources: SourceModel[];
    annotations: W3CAnnotation[];
    cols: number;
    config?: AnnotationConfig;
    selectedAnnotations?: Record<string, []>;
    annotationActions?: Record<string, AnnotationActions>;
    useSnapper?: UseSnapper<any>;
  }>(),
  {
    cols: 1
  }
);

const emits = defineEmits<AnnotationEmits>();

const gridColumns = computed(() => ({
  'grid-template-columns': `repeat(${properties.cols}, 1fr)`
}));

const hasEventListener = hasCustomEventListener('onEvent');
const onEvent = (
  type: AnnotationEventType,
  data: AnnotationEventHandlerPayloadData<any>
) => {
  if (!hasEventListener) return;
  emits('onEvent', type, data);
};
</script>
