<template>
  <div class="flex gap-3">
    <div class="w-[300px]">
      <AnnotationTree
        :filter="annotationStore.filter"
        :annotations="annotationStore.annotations"
        :chapters="bookStore.chapters"
        :active-chapter="bookStore.chapter"
        :sources="annotationStore.sources"
        @change-filter="annotationStore.changeFilter"
        @select-annotation="selectAnnotation"
      />
    </div>
    <div class="flex-grow w-full">
      <GhentCdhAnnotations
        :config="annotationConfig"
        :sources="annotationStore.sources"
        :annotations="annotations"
        :annotation-actions="annotationActions"
        :selected-annotations="selectedAnnotations"
        :use-snapper="useWordSnapper"
        :cols="annotationStore.sources.length"
        @on-event="eventHandler"
      />
    </div>
    <div class="w-[500px]">
      <template v-if="activeAnnotationStore.activeAnnotation">
        <ActiveAnnotation
          :active-annotation="activeAnnotationStore.activeAnnotation"
          :store-id="storeId"
          :links="activeAnnotationStore.activeAnnotationLinks"
          :text="textStore.text"
          :text-content="activeAnnotationStore.activeTextContent"
          @change-select-filter="annotationStore.changeSelectionFilter"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { findTagging } from '@ghentcdh/annotations/core';
import type {
  AnnotationConfig,
  AnnotationEventHandlerPayloadData,
  AnnotationEventType,
} from '@ghentcdh/annotations/vue';
import { GhentCdhAnnotations, useWordSnapper } from '@ghentcdh/annotations/vue';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text/dist/src';

import { IdentifyColorMap } from '../identify.color';
import ActiveAnnotation from './active-annotation.vue';
import { CREATE_MODES } from './props';
import { useActiveAnnotationStore } from './store/active-annotation.store';
import { useAnnotationListenerStore } from './store/annotation-listener.store';
import { useAnnotationStore } from './store/annotation.store';
import { useModeStore } from './store/mode.store';
import { useTextStore } from '../../text.store';
import AnnotationTree from './view/annotation-tree.vue';
import { useBookStore } from '../../../book.store';

type Properties = { storeId: string };
const properties = defineProps<Properties>();
const bookStore = useBookStore();

const emits = defineEmits<{
  closeAnnotation: [];
}>();

const annotationConfig: AnnotationConfig = {
  mapColor: (annotation) => {
    const type = findTagging(annotation);
    return IdentifyColorMap[type?.value];
  },
  mapTarget: (annotation) => {
    const type = findTagging(annotation);
    const mode = modeStore.activeMode;
    if (mode == 'adjust_annotation') return 'text';
    return type?.value === 'paragraph' ? 'gutter' : 'text';
  },
};

const isCreateMode = computed(() =>
  CREATE_MODES.includes(modeStore.activeMode),
);

const selectedAnnotations = computed(() => {
  const sources = annotationStore.sources;
  const activeAnnotations = new Set();

  if (activeAnnotationStore.activeAnnotation?.id) {
    activeAnnotations.add(activeAnnotationStore.activeAnnotation?.id);

    activeAnnotationStore.activeAnnotationLinks.forEach((a) => {
      activeAnnotations.add(a.annotation.id);
      a.relations.forEach((r) => {
        activeAnnotations.add(r.id);
      });
    });
  }
  const annotations = Array.from(activeAnnotations);

  return {
    [sources[0]?.uri]: annotations,
    [sources[1]?.uri]: annotations,
  };
});
const annotationActions = computed(() => {
  const sources = annotationStore.sources;

  return {
    [sources[0]?.uri]: {
      edit: false,
      create: isCreateMode.value,
    },
    [sources[1]?.uri]: {
      edit: false,
      create: isCreateMode.value,
    },
  };
});

// TODO add id
const listenerStore = useAnnotationListenerStore()();
const textStore = useTextStore();
const annotationStore = useAnnotationStore(properties.storeId);
const activeAnnotationStore = useActiveAnnotationStore(properties.storeId);
const modeStore = useModeStore();

const annotations = computed(() => annotationStore.annotations);

const eventHandler = (
  e: AnnotationEventType,
  payload: AnnotationEventHandlerPayloadData<unknown>,
) => {
  switch (e) {
    case 'click-annotation':
    case 'click-outside':
      onSelectAnnotation(payload.target, payload.annotationId);
      break;
    case 'create--end':
      const annotation = (
        payload.payload as CreateAnnotationState
      ).getAnnotation();
      annotationStore.createAnnotation(
        payload.target,
        annotation,
        modeStore.activeMode === 'create-annotation' ? 'phrase' : 'example',
      );
  }
};

// TODO if you click somewhere else also deselect the annotation
const onSelectAnnotation = async (
  textContentUri: string | null,
  annotationId: string | null,
) => {
  listenerStore.onClickAnnotation(annotationStore.getAnnotation(annotationId));

  if (modeStore.activeMode) {
    return;
  }

  const confirmed = { confirmed: true };

  if (!confirmed.confirmed) return;

  activeAnnotationStore.selectAnnotation({ textContentUri, annotationId });
};

const selectAnnotation = (annotationId: string, textContentUri: string) => {
  activeAnnotationStore.selectAnnotation({ annotationId, textContentUri });
};
</script>
