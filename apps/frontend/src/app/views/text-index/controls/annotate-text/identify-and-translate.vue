<template>
  <div class="flex gap-3 items-center">
    <Btn
      :color="Color.secondary"
      :disabled="!!store.selectedAnnotation || isCreateMode"
      @click="changeToCreateMode()"
    >
      Create new text block
    </Btn>
    <Btn
      :color="Color.secondary"
      :disabled="!!store.selectedAnnotation || isCreateMode"
      @click="changeCreateExample()"
    >
      Create example
    </Btn>
    <template v-if="mode === 'create'">
      <Btn @click="closeCreateMode"> Close create mode</Btn>
      <Btn :color="Color.secondary" @click="generateBlocks">
        Auto generate text blocks
      </Btn>
    </template>
    <Btn
      v-if="mode === 'create' && generatedBlocks"
      :color="Color.secondary"
      @click="saveGeneratedBlocks"
    >
      Save generated blocks
    </Btn>
  </div>

  <hr />
  <div class="flex gap-3">
    <GhentCdhAnnotations
      :config="annotationConfig"
      :sources="sources"
      :annotations="store.annotations"
      :annotation-actions="annotationActions"
      :selected-annotations="selectedAnnotations"
      :cols="sources.length"
      @on-event="eventHandler"
    />

    <div class="w-full max-w-sm">
      <template v-if="store.selectedAnnotation">
        <ActiveTranslationAnnotation
          :annotation="store.selectedAnnotation"
          :store-id="storeId"
        />
      </template>
      <div class="border-2" v-html="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TextContentDto } from '@mela/text/shared';
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
import { Btn, Color, ModalService } from '@ghentcdh/ui';
import type { ConfirmResult } from '@ghentcdh/ui';
import type { CreateAnnotationState } from '@ghentcdh/vue-component-annotated-text/dist/src';

import type { AnnotationStore } from './utils/annotation.store';
import { useAnnotationStore } from './utils/annotation.store';
import { useTextStore } from '../../text.store';
import { IdentifyColor, IdentifyColorMap } from '../identify.color';
import ActiveTranslationAnnotation from './active-translation-annotation.vue';
import { changeAnnotationSelection } from './utils/warning';

type Properties = {
  sourceText: TextContentDto;
  translatedText: TextContentDto;
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

type MODES = 'create' | 'create-example' | 'edit';
const CREATE_MODES: MODES[] = ['create', 'create-example'];
const mode = ref<MODES | null>(null);
const isCreateMode = computed(() => CREATE_MODES.includes(mode.value));

const generatedBlocks = ref(false);
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
    [sources.value[0].uri]: {
      edit: false,
      create: isCreateMode.value,
    },
    [sources.value[1].uri]: { edit: false, create: !!store.selectedAnnotation },
  };
});

// TODO add id
const storeId = 'identify_and_translate';
const store = useAnnotationStore(storeId)() as AnnotationStore;

store.init(properties.sourceText, properties.translatedText, textStore.textId);

const eventHandler = (
  e: AnnotationEventType,
  payload: AnnotationEventHandlerPayloadData<unknown>,
) => {
  const isSourceTarget = payload.target === properties.sourceText.uri;
  switch (e) {
    case 'click-annotation':
    case 'click-outside':
      onSelectAnnotation(payload.annotationId);
      break;
    case 'create--end':
      const annotation = (
        payload.payload as CreateAnnotationState
      ).getAnnotation();

      if (isSourceTarget) {
        store.createAnnotation(
          annotation,
          mode.value === 'create-example' ? 'example' : 'phrase',
        );
      } else {
        store.updateTranslation(annotation);
      }

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
const onSelectAnnotation = async (annotationId: string | null) => {
  const confirmed = await changeAnnotationSelection(store);
  if (!confirmed.confirmed) return;

  if (isCreateMode.value) {
    // mode.value = null;
    return;
  }

  store.selectAnnotation(annotationId);
  mode.value = annotationId ? 'edit' : null;
};

const generateBlocks = () => {
  store.autoGenerateBlocks();
  generatedBlocks.value = true;
};

const saveGeneratedBlocks = () => {
  store.saveGeneratedBlocks();
  generatedBlocks.value = false;
  closeCreateMode();
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
