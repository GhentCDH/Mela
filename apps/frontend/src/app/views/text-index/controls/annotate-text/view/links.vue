<template>
  <h2>Links</h2>

  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      Translations
    </legend>
    <ul class="list">
      <li
        v-for="t in translations"
        :key="t.link.id"
        class="list-row !px-0 !gap-2"
      >
        <div>{{ t.translation }}</div>
        <Btn
          :color="Color.secondary"
          :icon="IconEnum.Delete"
          @click="deleteAnnotation(t.link)"
        />
      </li>
    </ul>
  </fieldset>
  <fieldset
    v-if="linkTranslation"
    class="fieldset"
  >
    <legend class="fieldset-legend">
      Selected translation
    </legend>
    <p v-if="!linkedTranslation">
      Click on an annotation
    </p>
    <div v-if="linkedTranslation">
      {{ translatedText?.value }}
      <div class="flex gap-2 justify-end py-4">
        <Btn @click="saveTranslation">
          Save translation
        </Btn>
      </div>
    </div>
  </fieldset>
  <Btn
    v-if="!linkTranslation"
    @click="addLink"
  >
    Add translation
  </Btn>
</template>

<script setup lang="ts">
import { getAnnotationIdFromUri, getAnnotationUri } from '@mela/text/shared';
import { computed, effect, ref } from 'vue';

import type {
  W3CAnnotation} from '@ghentcdh/annotations/core';
import {
  findAnnotations,
  findByPurpose,
  findRelatedAnnotation
} from '@ghentcdh/annotations/core';
import { Btn, Color, IconEnum, ModalService } from '@ghentcdh/ui';

import { useAnnotationListenerStore } from '../store/annotation-listener.store';
import { createTranslationAnnotation } from '../utils/edit/linked-annotations';
import { findTextValue } from '../utils/translation';

const listenerStore = useAnnotationListenerStore()();

const linkTranslation = ref(false);

type Properties = {
  annotation: W3CAnnotation;
  annotations: W3CAnnotation[];
};
const properties = defineProps<Properties>();
const emits = defineEmits<{
  saveAnnotation: [W3CAnnotation];
  deleteAnnotation: [string];
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

const translatedText = computed(() => findTextValue(linkedTranslation.value));

const links = computed(() => {
  const sourceUri = getAnnotationUri(properties.annotation);
  return findAnnotations(properties.annotations).findInTargetSource(sourceUri);
});

const translations = computed(() =>
  links.value.filter(findByPurpose('translation')).map((link) => {
    const related = findRelatedAnnotation(
      properties.annotations,
      getAnnotationIdFromUri,
    )(link);

    const translation = related.find((r) => r.id !== properties.annotation.id);

    return { link, translation: findTextValue(translation)?.value };
  }),
);

const addLink = () => {
  linkTranslation.value = true;
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  ModalService.showConfirm({
    title: 'Delete link',
    message: 'Are you sure to delete this link',
    onClose: (result) => {
      if (result) {
        emits('deleteAnnotation', annotation.id);
      }
    },
  });
};

const saveTranslation = () => {
  const link = createTranslationAnnotation(
    properties.annotation,
    linkedTranslation.value,
  );

  emits('saveAnnotation', link);
};
</script>
