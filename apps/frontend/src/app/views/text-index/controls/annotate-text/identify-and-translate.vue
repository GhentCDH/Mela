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
    <div v-if="createMode" class="w-72 block">
      <SelectComponent
        v-model="annotationType"
        label="Text block type"
        :options="annotationTypes"
      />
    </div>
    <Btn v-if="createMode" :color="Color.secondary" @click="confirmTextBlocks">
      Confirm new blocks
    </Btn>
    <Btn v-if="createMode" :color="Color.secondary" @click="generateBlocks">
      Auto generate text blocks
    </Btn>
  </div>

  <hr />
  <div class="flex">
    <div
      :class="[
        `grid gap-2`,
        { 'grid-cols-1': createMode, 'grid-cols-2': !createMode },
      ]"
    >
      <div>
        <AnnotatedText
          :lines="store.sourceLines"
          :annotations="store.sourceAnnotations"
          :allow-create="createMode"
          @annotation-click="onSelectAnnotation($event, true)"
          @annotation-create-begin="annotationCreate($event, 'start')"
          @annotation-create-end="annotationCreate($event, 'end')"
        />
      </div>
      <div>
        <AnnotatedText
          v-if="!createMode"
          :lines="store.translatedLines"
          :annotations="store.selectedTranslationsAnnotations"
          :allow-create="!!store.selectedAnnotation"
          @annotation-click="onSelectAnnotation($event, false)"
          @annotation-create-begin="translateCreate($event, 'start')"
          @annotation-create-end="translateCreate($event, 'end')"
        />
      </div>
    </div>
    <div v-if="!createMode">
      <template v-if="store.selectedAnnotation">
        <div class="flex justify-end">
          <Btn
            :color="Color.secondary"
            :icon="IconEnum.Close"
            @click="onSelectAnnotation({ annotation: null }, true)"
          />
        </div>
        <SelectComponent
          v-model="annotationType"
          label="Annotation type"
          :options="annotationTypes"
          @change="changeType"
        />
        <div class="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" checked="checked" />
          <div class="collapse-title font-semibold">Transcriptions</div>
          <div class="collapse-content text-sm">
            <div class="font-bold">Original</div>
            {{ store.selectedAnnotation.transcription.source }}

            <div class="font-bold mt-2">Translated</div>
            {{ store.selectedAnnotation.transcription.translation }}
          </div>
        </div>
      </template>
      <div class="border-2" v-html="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// import { default as ControlWrapper.vue } from './ControlWrapper.vue.vue';
import type { TextContent } from '@ghentcdh/mela/generated/types';
import { Btn, Color, IconEnum, SelectComponent } from '@ghentcdh/ui';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text';
import { AnnotatedText } from '@ghentcdh/vue-component-annotated-text';

import { useAnnotationStore } from './w3c/annotation.store';
import type { MelaAnnotation } from './w3c/mela_annotation';
import { useTextStore } from '../../text.store';
import { IdentifyColor, IdentifyColorMap } from '../identify.color';

type Properties = {
  sourceText: TextContent;
  translatedText: TextContent;
};
const properties = defineProps<Properties>();

const content = computed(() => markdown.parse(properties.sourceText?.content));
const annotationTypes = IdentifyColor;
const annotationType = ref(IdentifyColor[0]);
const createMode = ref(false);
const editMode = ref(false);
const textStore = useTextStore();

// TODO add id
const store = useAnnotationStore('id')();
// TODO add the real annotations from the BE
store.init(
  properties.sourceText.content,
  properties.translatedText.content,
  textStore.textId,
);

const changeToCreateMode = () => {
  createMode.value = true;
  store.selectAnnotation(null);
};

const annotationCreate = (
  event: CreateAnnotationState,
  type: 'start' | 'end' | 'updating',
) => {
  if (type === 'start') {
    event.init({ color: IdentifyColorMap[annotationType.value.id] });
    // activeAnnotation.value = event.annotation;
  } else if (type === 'end') {
    const annotation = event.getAnnotation();
    store.createAnnotation(annotation, annotationType.value.id);
  }
};

const translateCreate = (
  event: CreateAnnotationState,
  type: 'start' | 'end' | 'updating',
) => {
  if (!store.selectedAnnotation) {
    return;
  }

  if (type === 'start') {
    event.init({ color: IdentifyColorMap[annotationType.value.id] });
    // activeAnnotation.value = event.annotation;
  } else if (type === 'end') {
    const annotation = event.getAnnotation();
    store.updateTranslation(annotation);
  }
};

const changeType = () => {
  if (!store.selectedAnnotation) {
    return;
  }
  store.selectedAnnotation.changeType(annotationType.value.id);
};

// TODO if you click somewhere else also deselect the annotation
const onSelectAnnotation = (
  {
    annotation,
  }: {
    annotation: MelaAnnotation | undefined;
  },
  ignoreEditMode: boolean,
) => {
  if (!ignoreEditMode && store.selectedAnnotation) {
    return;
  }

  if (createMode.value) {
    editMode.value = false;
    return;
  }
  if (!annotation) {
    editMode.value = false;
    store.selectAnnotation(null);
    return;
  }

  const selected = store.selectAnnotation(annotation?.id);
  const type = selected.type;
  annotationType.value = IdentifyColor.find((i) => i.id === type)!;
  editMode.value = true;
};

const generateBlocks = () => {
  store.autoGenerateBlocks();
};

const confirmTextBlocks = () => {
  createMode.value = false;
  store.createNewAnnotations();
};

// showAllTranslations();

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
