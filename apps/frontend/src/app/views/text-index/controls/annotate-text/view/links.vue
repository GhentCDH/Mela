<template>
  <h2>Links</h2>
  <fieldset v-if="linkTranslation" class="fieldset">
    <legend class="fieldset-legend">Selected translation</legend>
    <p v-if="!linkedTranslation">Click on an annotation</p>
    <div v-if="linkedTranslation">
      {{ translatedText?.value }}
      <div class="flex gap-2 justify-end py-4">
        <Btn @click="saveTranslation"> Save translation </Btn>
      </div>
    </div>
  </fieldset>
  <Btn v-if="!linkTranslation" @click="addLink"> Add translation </Btn>
</template>

<script setup lang="ts">
import { computed, effect, ref } from 'vue';

import type { TextualBody, W3CAnnotation } from '@ghentcdh/annotations/core';
import { findBodyType } from '@ghentcdh/annotations/core';
import { Btn } from '@ghentcdh/ui';

import { useAnnotationListenerStore } from '../store/annotation-listener.store';
import { createTranslationAnnotation } from '../utils/edit/linked-annotations';

const listenerStore = useAnnotationListenerStore()();

const linkTranslation = ref(false);

type Properties = {
  annotation: W3CAnnotation;
};
const properties = defineProps<Properties>();
const emits = defineEmits<{
  saveAnnotation: [W3CAnnotation];
}>();

const linkedTranslation = ref();

effect(() => {
  if (!linkTranslation.value) {
    linkedTranslation.value = null;
    return;
  }
  const clAnnotation = listenerStore.clickAnnotation;

  if (!clAnnotation) {
    linkedTranslation.value = null;
    return;
  }

  const activeAnnotation = properties.annotation.id;
  if (clAnnotation.id === activeAnnotation) {
    linkedTranslation.value = null;
    return;
  }
  linkedTranslation.value = listenerStore.clickAnnotation;
});

const translatedText = computed(() =>
  linkedTranslation.value
    ? findBodyType<TextualBody>(
        'TextualBody',
        (body: TextualBody) => !!body.language,
      )(linkedTranslation.value)
    : '',
);

const addLink = () => {
  linkTranslation.value = true;
};

const saveTranslation = () => {
  const link = createTranslationAnnotation(
    properties.annotation,
    linkedTranslation.value,
  );

  emits('saveAnnotation', link);
};
</script>
