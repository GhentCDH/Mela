<template>
  <div class="flex gap-3 items-center">
    <Btn
      :color="Color.secondary"
      :disabled="!!store.selectedAnnotationId || isCreateMode"
      @click="changeToCreateMode()"
    >
      Create new text block
    </Btn>
    <Btn
      :color="Color.secondary"
      :disabled="!!store.selectedAnnotationId || isCreateMode"
      @click="changeCreateExample()"
    >
      Create example
    </Btn>
    <template v-if="mode === 'create'">
      <Btn @click="closeCreateMode"> Close create mode</Btn>
    </template>
  </div>

  <hr />
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
      <template v-if="store.selectedAnnotationId">
        <ActiveAnnotation
          :annotation-id="store.selectedAnnotationId"
          :active-annotation="store.activeAnnotation"
          :links="store.activeAnnotationLinks"
          :text-with-annotations="store.textWithAnnotations"
          @save-annotation="store.saveOrCreateAnnotation"
          @delete-annotation="store.deleteAnnotation"
          @change-annotation="store.reloadFromTextWithAnnotations()"
          @close-annotation="closeAnnotation"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TextContentDto } from '@mela/text/shared';
import { computed, ref } from 'vue';

import { findTagging } from '@ghentcdh/annotations/core';
import { GhentCdhAnnotations } from '@ghentcdh/annotations/vue';
import type {
  AnnotationConfig,
  AnnotationEventHandlerPayloadData,
  AnnotationEventType,
} from '@ghentcdh/annotations/vue';
import { Btn, Color, ModalService } from '@ghentcdh/ui';
import type { ConfirmResult } from '@ghentcdh/ui';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text/dist/src';

import { useAnnotationStore } from './utils/annotation.store';
import { useTextStore } from '../../text.store';
import { IdentifyColorMap } from '../identify.color';
import ActiveAnnotation from './active-annotation.vue';
import type { MODES } from './props';
import { CREATE_MODES } from './props';
import { useAnnotationListenerStore } from './store/annotation-listener.store';

type Properties = { storeId: string };
const properties = defineProps<Properties>();

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

const mode = ref<MODES | null>(null);
const isCreateMode = computed(() => CREATE_MODES.includes(mode.value));

const selectedAnnotations = computed(() => {
  const sources = store.sources;
  const activeAnnotations = new Set();

  if (store.selectedAnnotationId) {
    activeAnnotations.add(store.selectedAnnotationId);

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

const store = useAnnotationStore(properties.storeId)();

const eventHandler = (
  e: AnnotationEventType,
  payload: AnnotationEventHandlerPayloadData<unknown>,
) => {
  // const isSourceTarget = payload.target === properties.sourceText.uri;
  switch (e) {
    case 'click-annotation':
    case 'click-outside':
      onSelectAnnotation(payload.annotationId, false);
      break;
    case 'create--end':
      const annotation = (
        payload.payload as CreateAnnotationState
      ).getAnnotation();

      store.createAnnotation(
        payload.target,
        annotation,
        mode.value === 'create-example' ? 'example' : 'phrase',
      );

      break;
    default:
      console.log('event not handled', e);
  }
};

const changeCreateExample = () => {
  mode.value = 'create-example';
  store.selectAnnotation(null);
};

const changeToCreateMode = () => {
  mode.value = 'create';
  store.selectAnnotation(null);
};

// TODO if you click somewhere else also deselect the annotation
const onSelectAnnotation = async (
  annotationId: string | null,
  allowedDuringActiveMode: boolean,
) => {
  listenerStore.onClickAnnotation(
    store.textWithAnnotations.getAnnotation(annotationId),
  );

  if (mode.value) {
    // mode.value = null;
    return;
  }

  // TODO check if something changed
  // const confirmed = await changeAnnotationSelection(store, annotationId, () => {
  //   store.reloadFromTextWithAnnotations();
  // });
  const confirmed = { confirmed: true };

  if (!confirmed.confirmed) return;

  store.selectAnnotation(annotationId);
  mode.value = annotationId ? 'edit' : null;
};

const closeCreateMode = () => {
  if (generatedBlocks.value)
    ModalService.showConfirm({
      title: 'Warning',
      message:
        'There are generated blocks that are not saved yet. Save them first?',
      cancelLabel: 'Delete',
      confirmLabel: 'Save generated blocks',
      onClose: (result: ConfirmResult) => {
        if (result.confirmed) store.saveGeneratedBlocks();
        else store.cancelGeneratedBLocks();

        generatedBlocks.value = false;
        mode.value = null;
      },
    });
  else {
    generatedBlocks.value = false;
    mode.value = null;
  }
};

const closeAnnotation = () => {
  store.reloadFromTextWithAnnotations();
  store.selectAnnotation(null);
  mode.value = null;
  return;
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
