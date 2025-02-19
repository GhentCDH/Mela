<template>
  <div class="flex gap-3 items-center">
    <Btn
      v-if="!createMode"
      :color="Color.secondary"
      :disabled="!!store.selectedAnnotation"
      @click="changeToCreateMode()"
    >
      Create new text blocks
    </Btn>
    <div
      v-if="createMode"
      class="w-72 block"
    >
      <SelectComponent
        v-model="annotationType"
        label="Text block type"
        :options="annotationTypes"
      />
    </div>
    <Btn
      v-if="createMode"
      :color="Color.secondary"
      @click="confirmTextBlocks"
    >
      Confirm new blocks
    </Btn>
    <Btn
      v-if="createMode"
      :color="Color.secondary"
      @click="generateBlocks"
    >
      Auto generate text blocks
    </Btn>
  </div>

  <hr>
  <div class="flex gap-3">
    <div
      :class="[
        `grid gap-2 flex-1`,
        { 'grid-cols-1': createMode, 'grid-cols-2': !createMode },
      ]"
    >
      <div class="flex-1 col-span-2">
        <GhentCdhAnnotations
          :config="annotationConfig"
          :sources="sources"
          :annotations="store.annotations"
          :annotation-actions="annotationActions"
          :selected-annotations="selectedAnnotations"
          :cols="sources.length"
          @on-event="eventHandler"
        />
        <hr>
      </div>
    </div>
    <div
      v-if="!createMode"
      class="w-full max-w-sm"
    >
      <template v-if="store.selectedAnnotation">
        <ActiveTranslationAnnotation
          :annotation="store.selectedAnnotation"
          :store-id="storeId"
        />
      </template>
      <div
        class="border-2"
        v-html="content"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// import { default as ControlWrapper.vue } from './ControlWrapper.vue.vue';
import {
  SourceModelSchema,
  SourceTextSchema,
  findTagging,
} from '@ghentcdh/annotations/core';
import { GhentCdhAnnotations } from '@ghentcdh/annotations/vue';
import type {
  AnnotationConfig,
  AnnotationEventHandlerPayloadData,
  AnnotationEventType,
} from '@ghentcdh/annotations/vue';
import type { TextContent } from '@ghentcdh/mela/generated/types';
import { Btn, Color, SelectComponent } from '@ghentcdh/ui';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text/dist/src';

import { useAnnotationStore } from './utils/annotation.store';
import { useTextStore } from '../../text.store';
import { IdentifyColor, IdentifyColorMap } from '../identify.color';
import ActiveTranslationAnnotation from './active-translation-annotation.vue';

type Properties = {
  sourceText: TextContent;
  translatedText: TextContent;
};
const properties = defineProps<Properties>();

const sources = computed(() => {
  const content = [properties.sourceText, properties.translatedText].filter(
    (c) => !!c,
  );

  return content.map((c) => {
    return SourceModelSchema.parse({
      content: SourceTextSchema.parse({
        text: c.content,
        processingLanguage: c.language,
      }),
      id: c.id,
      type: 'text',
      uri: c.uri,
    });
  });
});

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

const content = computed(() => markdown.parse(properties.sourceText?.content));
const annotationType = ref(IdentifyColor[0]);
const createMode = ref(false);
const editMode = ref(false);
const textStore = useTextStore();
const selectedAnnotations = computed(() => {
  const annotations = store.selectedAnnotation
    ? [store.selectedAnnotation.getId()]
    : [];
  return {
    [sources.value[0].uri]: annotations,
    [sources.value[1].uri]: annotations,
  };
});
const annotationActions = computed(() => {
  return {
    [sources.value[0].uri]: { edit: false, create: createMode.value },
    [sources.value[1].uri]: { edit: false, create: !!store.selectedAnnotation },
  };
});

// TODO add id
const storeId = 'id';
const store = useAnnotationStore(storeId)();
// TODO add the real annotations from the BE
store.init(properties.sourceText, properties.translatedText, textStore.textId);

const eventHandler = (
  e: AnnotationEventType,
  payload: AnnotationEventHandlerPayloadData<unknown>,
) => {
  console.log(e, payload);
  const isSourceTarget = payload.target === properties.sourceText.uri;
  switch (e) {
    case 'click-annotation':
      onSelectAnnotation(null, isSourceTarget);
      store.selectAnnotation(payload.annotationId);
      break;
    case 'click-outside':
      onSelectAnnotation(payload.annotationId, isSourceTarget);
      break;
    case 'create--end':
      const annotation = (
        payload.payload as CreateAnnotationState
      ).getAnnotation();

      if (isSourceTarget) {
        store.createAnnotation(annotation, annotationType.value.id);
      } else {
        store.updateTranslation(annotation);
      }

      break;
    default:
      console.log('event not handled', e);
  }
};

const changeToCreateMode = () => {
  createMode.value = true;
  store.selectAnnotation(null);
};

// TODO if you click somewhere else also deselect the annotation
const onSelectAnnotation = (
  annotationId: string | null,
  ignoreEditMode: boolean,
) => {
  if (!ignoreEditMode && store.selectedAnnotation) {
    return;
  }

  if (createMode.value) {
    editMode.value = false;
    return;
  }
  if (!annotationId) {
    editMode.value = false;
    store.selectAnnotation(null);
    return;
  }

  editMode.value = true;
};

const generateBlocks = () => {
  store.autoGenerateBlocks();
};

const confirmTextBlocks = () => {
  createMode.value = false;
  store.createNewAnnotations();
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
