<template>
  <Card>
    <template #title>
      <div class="w-full flex justify-end">
        <Btn
          :color="Color.secondary"
          :icon="IconEnum.Close"
          @click="store.selectAnnotation(null)"
        />
      </div>
    </template>
    <SelectComponent
      v-model="annotationType"
      label="Annotation type"
      :options="annotationTypes"
      @change="changeType"
    />
    <div class="collapse collapse-arrow bg-base-100 border border-base-300">
      <input
        type="radio"
        name="my-accordion-2"
        checked="checked"
      >
      <div class="collapse-title font-semibold">
        Transcriptions
      </div>
      <div class="collapse-content text-sm">
        <div class="font-bold">
          Original
        </div>
        {{ sourceText }}

        <div class="font-bold mt-2">
          Translated
        </div>
        {{ targetText }}
      </div>
    </div>
    <template #actions>
      <Btn
        :color="Color.error"
        @click="deleteActiveAnnotation"
      >
        Delete
      </Btn>
      <Btn @click="saveActiveAnnotation">
        Save
      </Btn>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { AnnotationMetadataType } from '@mela/text/shared';
import { computed, ref, watch } from 'vue';

import { getTextFromSelector } from '@ghentcdh/annotations/core';
import { Btn, Card, Color, IconEnum, SelectComponent } from '@ghentcdh/ui';

import { IdentifyColor } from '../identify.color';
import { useAnnotationStore } from './utils/annotation.store';
import type { EditableAnnotation } from './utils/parse';

const annotationTypes = IdentifyColor;

const annotationType = ref<{ label: string; id: string }>(IdentifyColor[0]);

type Properties = {
  annotation: EditableAnnotation;
  storeId: string;
};
const properties = defineProps<Properties>();

const store = useAnnotationStore(properties.storeId)();

const sourceText = computed(() => {
  const annotation = properties.annotation.getAnnotation();
  const source = properties.annotation.getSource();

  return getTextFromSelector(annotation, source.uri, source.content);
});
const targetText = computed(() => {
  const annotation = properties.annotation.getAnnotation();
  const source = properties.annotation.getTarget();

  return getTextFromSelector(annotation, source?.uri, source?.content);
});

const changeType = () => {
  store.changeType(annotationType.value.id as AnnotationMetadataType);
};

const deleteActiveAnnotation = () => {
  // TODO add confirm modal
  store.deleteActiveAnnotation();
};

const saveActiveAnnotation = () => {
  store.saveActiveAnnotation();
};
 
watch(
  () => properties.annotation,
  (newVal) => {
    const type = newVal.getType();
    annotationType.value =
      IdentifyColor.find((c) => c.id === type) ?? IdentifyColor[0];
  },
  { immediate: true },
);
</script>
