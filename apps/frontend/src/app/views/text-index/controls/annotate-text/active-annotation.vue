<template>
  <Card>
    <template #title>
      <div class="w-full flex justify-end">
        <Btn
          :color="Color.secondary"
          :icon="IconEnum.Close"
          @click="closeAnnotation()"
        />
      </div>
    </template>
    <SelectComponent
      v-model="annotationType"
      label="Annotation type"
      :options="annotationTypes"
      @change="changeType"
    />

    <AddExample
      v-if="annotationType?.id === 'example'"
      :annotation="activeAnnotation"
    />
    <div class="flex gap-2 justify-end pb-4">
      <Btn :color="Color.error" @click="deleteActiveAnnotation"> Delete</Btn>
      <Btn @click="saveActiveAnnotation"> Save</Btn>
    </div>

    <template v-if="annotationType?.id !== 'example'">
      <div class="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" :checked="checked" />
        <div class="collapse-title font-semibold">Transcriptions</div>
        <div class="collapse-content text-sm">
          <div class="font-bold">Original</div>

          <div class="font-bold mt-2">Translated</div>
        </div>
      </div>
    </template>
    <template #actions />
  </Card>
</template>

<script setup lang="ts">
import type { AnnotationMetadataType } from '@mela/text/shared';
import { computed, onBeforeUnmount, ref, watch } from 'vue';

import { findTagging, W3CAnnotation } from '@ghentcdh/annotations/core';
import { Btn, Card, Color, IconEnum, SelectComponent } from '@ghentcdh/ui';

import { IdentifyColor } from '../identify.color';
import AddExample from './add-example.vue';
import { changeAnnotationSelection } from './utils/warning';
import { TextWithAnnotations } from './utils/text';
import { AnnotationTester } from './utils/tester';
import { cloneDeep, isEqual } from 'lodash-es';

const annotationTypes = IdentifyColor;
const checked = ref(true);

const annotationType = ref<{ label: string; id: string }>(IdentifyColor[0]);

type Properties = {
  annotationId: string;
  textWithAnnotations: TextWithAnnotations;
};
const properties = defineProps<Properties>();
let originalAnnotation: W3CAnnotation;

const emits = defineEmits<{
  changeAnnotation: [W3CAnnotation];
  deleteAnnotation: [string];
  saveAnnotation: [W3CAnnotation];
  closeAnnotation: [];
}>();

const changeType = () => {
  const annotation = properties.textWithAnnotations.changeType(
    properties.annotationId,
    annotationType.value.id as AnnotationMetadataType,
  );
  emits('changeAnnotation', annotation);
};

const deleteActiveAnnotation = () => {
  // TODO add confirm modal
  emits('deleteAnnotation', properties.annotationId);
};

const saveActiveAnnotation = () => {
  emits(
    'saveAnnotation',
    properties.textWithAnnotations.getAnnotation(properties.annotationId),
  );
};
const getActiveAnnotation = () => {
  return properties.textWithAnnotations.getAnnotation(properties.annotationId);
};

watch(
  () => ({ text: properties.textWithAnnotations, id: properties.annotationId }),
  (n) => {
    const annotation = getActiveAnnotation();
    const type = findTagging(annotation).value ?? 'phrase';
    originalAnnotation = cloneDeep(annotation);
    annotationType.value =
      IdentifyColor.find((c) => c.id === type) ?? IdentifyColor[0];
  },
  { immediate: true },
);

onBeforeUnmount((hook) => {
  console.log(hook);
  // alert('1234');
});

const closeAnnotation = async () => {
  const activeAnnotation = getActiveAnnotation();
  const confirmed = await changeAnnotationSelection(
    !isEqual(activeAnnotation, originalAnnotation),
    activeAnnotation,
  );

  if (confirmed.undoChanges) {
    const textWithAnnotations = properties.textWithAnnotations;
    if (AnnotationTester(originalAnnotation).isNew()) {
      textWithAnnotations.cancelAnnotations(originalAnnotation.id);
    } else {
      properties.textWithAnnotations.setAnnotation(originalAnnotation);
    }
  }
  if (confirmed.confirmed) {
    emits('closeAnnotation');
  }
};
</script>
