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
      <legend class="fieldset-legend">
        Selected text:
      </legend>
      {{ selectedText?.value }}
    </fieldset>
    <SelectComponent
      v-model="annotationType"
      label="Annotation type"
      :options="annotationTypes"
      @change="changeType"
    />
    <div class="flex gap-2 justify-end pb-4">
      <Btn
        :color="Color.error"
        @click="deleteActiveAnnotation"
      >
        Delete
      </Btn>
      <Btn @click="saveActiveAnnotation">
        Save
      </Btn>
    </div>
    <Links
      :annotation="activeAnnotation"
      :links="links"
      :text="text"
      :text-content="textContent"
      @save-annotation="saveAnnotation"
      @delete-annotation="deleteAnnotation"
      @save-example="emits('saveExample', $event)"
    />

    <template #actions />
  </Card>
</template>

<script setup lang="ts">
import type { AnnotationMetadataType, ExampleDto } from '@mela/text/shared';
import { cloneDeep, isEqual } from 'lodash-es';
import { computed, ref, watch } from 'vue';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { findTagging } from '@ghentcdh/annotations/core';
import type { TextContent } from '@ghentcdh/mela/generated/types';
import {
  Btn,
  Card,
  Color,
  IconEnum,
  ModalService,
  SelectComponent,
} from '@ghentcdh/ui';

import { IdentifyColor } from '../identify.color';
import type { AnnotationWithRelations } from './props';
import { AnnotationTester } from './utils/tester';
import type { TextWithAnnotations } from './utils/text';
import { findTextValue } from './utils/translation';
import { changeAnnotationSelection } from './utils/warning';
import Links from './view/links.vue';

const annotationTypes = IdentifyColor;

const annotationType = ref<{ label: string; id: string }>(IdentifyColor[0]);

type Properties = {
  textWithAnnotations: TextWithAnnotations;
  activeAnnotation: W3CAnnotation;
  links: AnnotationWithRelations[];
  text: Text;
  textContent: TextContent;
};
const properties = defineProps<Properties>();
let originalAnnotation: W3CAnnotation;

const emits = defineEmits<{
  changeAnnotation: [W3CAnnotation];
  deleteAnnotation: [string];
  saveAnnotation: [W3CAnnotation];
  closeAnnotation: [];
  saveExample: [ExampleDto];
}>();

const changeType = () => {
  const annotation = properties.textWithAnnotations.changeType(
    properties.activeAnnotation.id,
    annotationType.value.id as AnnotationMetadataType,
  );
  emits('changeAnnotation', annotation);
};

const deleteAnnotation = (annotationId: string) => {
  emits('deleteAnnotation', annotationId);
};

const deleteActiveAnnotation = () => {
  emits('deleteAnnotation', properties.activeAnnotation.id);
  ModalService.showConfirm({
    title: 'Delete annotation',
    message: 'Are you sure to delete this annotation, all links will be lost?',
    onClose: (result) => {
      if (result) {
        deleteAnnotation(properties.activeAnnotation.id);
      }
    },
  });
};

const saveActiveAnnotation = () => {
  saveAnnotation(
    properties.textWithAnnotations.getAnnotation(
      properties.activeAnnotation.id,
    ),
  );
};

const saveAnnotation = (annotation: W3CAnnotation) => {
  emits('saveAnnotation', annotation);
};

const selectedText = computed(() => findTextValue(properties.activeAnnotation));

watch(
  () => properties.activeAnnotation,
  (n) => {
    const annotation = properties.activeAnnotation;
    const type = findTagging(annotation).value ?? 'phrase';
    originalAnnotation = cloneDeep(annotation);
    annotationType.value =
      IdentifyColor.find((c) => c.id === type) ?? IdentifyColor[0];
  },
  { immediate: true },
);

const closeAnnotation = async () => {
  const activeAnnotation = properties.activeAnnotation;
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
