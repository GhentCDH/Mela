<template>
  <div class="flex gap-3">
    <div class="w-[300px]">
      <AnnotationTree
        :filter="store.filter"
        :annotations="store.annotations"
        :chapters="bookStore.chapters"
        :active-chapter="bookStore.chapter"
        :sources="store.sources"
        @change-filter="store.changeFilter"
        @select-annotation="selectAnnotation"
      />
    </div>
    <div class="flex-grow w-full">
      <GhentCdhAnnotations
        :config="annotationConfig"
        :sources="store.sources"
        :annotations="annotations"
        :annotation-actions="annotationActions"
        :selected-annotations="selectedAnnotations"
        :use-snapper="useWordSnapper"
        :cols="store.sources.length"
        @on-event="eventHandler"
      />
    </div>
    <div class="w-[500px]">
      <template v-if="store.activeAnnotation">
        <ActiveAnnotation
          :active-annotation="store.activeAnnotation"
          :store-id="storeId"
          :links="store.activeAnnotationLinks"
          :text="textStore.text"
          :text-content="store.activeTextContent"
          @adjust-selection="adjustSelection"
          @delete-annotation="deleteAnnotation"
          @close-annotation="closeAnnotation"
          @change-select-filter="store.changeSelectionFilter"
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
  const sources = store.sources;
  const activeAnnotations = new Set();

  if (store.activeAnnotation?.id) {
    activeAnnotations.add(store.activeAnnotation?.id);

    store.activeAnnotationLinks.forEach((a) => {
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
  const sources = store.sources;
  const mode = modeStore.activeMode;

  return {
    [sources[0]?.uri]: {
      edit: mode === 'adjust_annotation',
      create: isCreateMode.value,
    },
    [sources[1]?.uri]: {
      edit: mode === 'adjust_annotation',
      create: isCreateMode.value,
    },
  };
});

// TODO add id
const listenerStore = useAnnotationListenerStore()();
const textStore = useTextStore();
const store = useAnnotationStore(properties.storeId);
const modeStore = useModeStore();

const annotations = computed(() =>
  modeStore.activeMode === 'adjust_annotation'
    ? [store.activeAnnotation]
    : store.annotations,
);

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
      store.createAnnotation(
        payload.target,
        annotation,
        modeStore.activeMode === 'create-annotation' ? 'phrase' : 'example',
      );
    case 'update--end':
      const annotation1 = payload.payload.getAnnotation();
      // store.updateActiveAnnotation(payload.target, annotation1);
      break;
  }
};

// TODO if you click somewhere else also deselect the annotation
const onSelectAnnotation = async (
  textContentUri: string | null,
  annotationId: string | null,
) => {
  listenerStore.onClickAnnotation(store.getAnnotation(annotationId));

  if (modeStore.activeMode) {
    return;
  }

  const confirmed = { confirmed: true };

  if (!confirmed.confirmed) return;

  store.selectAnnotation({ textContentUri, annotationId });
};

const selectAnnotation = (annotationId: string, textContentUri: string) => {
  store.selectAnnotation({ annotationId, textContentUri });
};
</script>
