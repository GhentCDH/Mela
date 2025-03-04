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
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Selected text:</legend>
      {{ selectedText?.value }}
    </fieldset>
    <SelectComponent
      v-model="annotationType"
      label="Annotation type"
      :options="annotationTypes"
      @change="changeType"
    />
    <div class="flex gap-2 justify-end pb-4">
      <Btn :color="Color.error" @click="deleteActiveAnnotation"> Delete </Btn>
      <Btn @click="saveActiveAnnotation"> Save </Btn>
    </div>
    <Links :annotation="activeAnnotation" @save-annotation="saveAnnotation" />

    <template v-if="annotationType?.id !== 'example'">
      <Translation
        :annotation="activeAnnotation"
        :linked-annotations="linkedAnnotations"
      />
    </template>
    <template #actions />
  </Card>
</template>

<script setup lang="ts">
import type { AnnotationMetadataType } from '@mela/text/shared';
import { cloneDeep, isEqual } from 'lodash-es';
import { computed, onBeforeUnmount, ref, watch } from 'vue';

import type {
  type TextualBody,
  W3CAnnotation,
  findBodyType,
  findTextualBodyByLanguage,
} from '@ghentcdh/annotations/core';
import { findTagging } from '@ghentcdh/annotations/core';
import { Btn, Card, Color, IconEnum, SelectComponent } from '@ghentcdh/ui';

import { IdentifyColor } from '../identify.color';
import AddExample from './add-example.vue';
import { MODES } from './mode';
import { AnnotationTester } from './utils/tester';
import type { TextWithAnnotations } from './utils/text';
import { changeAnnotationSelection } from './utils/warning';
import Links from './view/links.vue';
import Translation from './view/translation.vue';

const annotationTypes = IdentifyColor;

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
  saveAnnotation(
    properties.textWithAnnotations.getAnnotation(properties.annotationId),
  );
};

const saveAnnotation = (annotation: W3CAnnotation) => {
  emits('saveAnnotation', annotation);
};

const getActiveAnnotation = () => {
  return properties.textWithAnnotations.getAnnotation(properties.annotationId);
};

const activeAnnotation = computed(() => getActiveAnnotation());
const linkedAnnotations = computed(() => [activeAnnotation.value]);
const selectedText = computed(() =>
  findBodyType<TextualBody>(
    'TextualBody',
    (body: TextualBody) => !!body.language,
  )(activeAnnotation.value),
);

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
