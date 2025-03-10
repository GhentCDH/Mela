<template>
  <div class="flex gap-3">
    <GhentCdhAnnotations
      :config="annotationConfig"
      :sources="store.sources"
      :annotations="store.annotations"
      :annotation-actions="annotationActions"
      :selected-annotations="selectedAnnotations"
      :cols="store.sources.length"
      @on-event="eventHandler"
    />

    <div class="w-350">
      <template v-if="store.activeAnnotation">
        <ActiveAnnotation
          :active-annotation="store.activeAnnotation"
          :links="store.activeAnnotationLinks"
          :text-with-annotations="store.textWithAnnotations"
          :text="textStore.text"
          :text-content="store.activeTextContent"
          @save-annotation="saveAnnotation"
          @delete-annotation="deleteAnnotation"
          @change-annotation="store.reloadFromTextWithAnnotations()"
          @close-annotation="closeAnnotation"
          @save-example="saveExample"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { findTagging } from '@ghentcdh/annotations/core';
import { GhentCdhAnnotations } from '@ghentcdh/annotations/vue';
import type {
  AnnotationConfig,
  AnnotationEventHandlerPayloadData,
  AnnotationEventType,
} from '@ghentcdh/annotations/vue';
import type { Example } from '@ghentcdh/mela/generated/types';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text/dist/src';

import { IdentifyColorMap } from '../identify.color';
import ActiveAnnotation from './active-annotation.vue';
import { CREATE_MODES } from './props';
import { useAnnotationListenerStore } from './store/annotation-listener.store';
import { useModeStore } from './store/mode.store';
import { useAnnotationStore } from './utils/annotation.store';
import { useTextStore } from '../../text.store';

type Properties = { storeId: string };
const properties = defineProps<Properties>();

const emits = defineEmits<{
  deleteAnnotation: [W3CAnnotation];
  saveAnnotation: [W3CAnnotation];
  saveExample: [Example];
  closeAnnotation: [];
}>();

const annotationConfig: AnnotationConfig = {
  mapColor: (annotation) => {
    const type = findTagging(annotation);
    return IdentifyColorMap[type?.value];
  },
  mapTarget: (annotation) => {
    const type = findTagging(annotation);
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
    [sources[0].uri]: annotations,
    [sources[1].uri]: annotations,
  };
});
const annotationActions = computed(() => {
  const sources = store.sources;

  return {
    [sources[0].uri]: {
      edit: false,
      create: isCreateMode.value,
    },
    [sources[1].uri]: { edit: false, create: isCreateMode.value },
  };
});

// TODO add id
const listenerStore = useAnnotationListenerStore()();
const textStore = useTextStore();
const store = useAnnotationStore(properties.storeId);
const modeStore = useModeStore();

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

      break;
    default:
      console.log('event not handled', e);
  }
};

// TODO if you click somewhere else also deselect the annotation
const onSelectAnnotation = async (
  textContentId: string | null,
  annotationId: string | null,
) => {
  listenerStore.onClickAnnotation(
    store.textWithAnnotations.getAnnotation(annotationId),
  );

  console.log(modeStore.activeMode);

  if (modeStore.activeMode) {
    // mode.value = null;
    return;
  }

  // TODO check if something changed
  // const confirmed = await changeAnnotationSelection(store, annotationId, () => {
  //   store.reloadFromTextWithAnnotations();
  // });
  const confirmed = { confirmed: true };

  if (!confirmed.confirmed) return;

  store.selectAnnotation({ textContentId, annotationId });
  modeStore.changeMode('edit');
  // modeStore.value = annotationId ? 'edit' : null;
};

const closeAnnotation = () => {
  emits('closeAnnotation');
};

const saveAnnotation = (annotation: W3CAnnotation) => {
  emits('saveAnnotation', annotation);
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  emits('deleteAnnotation', annotation);
};

const saveExample = (annotation: W3CAnnotation) => {
  emits('saveExample', annotation);
};

const MD = () => {
  const parse = (text: string) => {
    if (!text) return text;

    return text
      .replace(/\n/g, '<br />')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<i>$1</i>');
  };

  return { parse };
};
const markdown = MD();
</script>
