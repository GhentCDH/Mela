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
    <AnnotationMetadata
      v-model="annotationMetadata"
      :selected-text="selectedText"
      @valid="onValid($event)"
    />

    <div class="flex gap-2 justify-end pb-4">
      <Btn :color="Color.error" @click="deleteActiveAnnotation"> Delete </Btn>
      <Btn :disabled="!valid" @click="saveActiveAnnotation"> Save </Btn>
    </div>
    <Translations
      :annotation="activeAnnotation"
      :links="links"
      :text="text"
      :text-content="textContent"
      @save="saveAnnotation"
      @delete="deleteAnnotation"
    />

    <template #actions />
  </Card>
</template>

<script setup lang="ts">
import type { AnnotationMetadataType, ExampleDto } from '@mela/text/shared';
import {
  findExampleMetaData,
  getExampleIdFromUri,
  isNewExampleUri,
} from '@mela/text/shared';
import { cloneDeep, isEqual, pick } from 'lodash-es';
import { metadata } from 'reflect-metadata/no-conflict';
import { computed, ref, watch } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  findTextPositionSelector,
  findTagging,
} from '@ghentcdh/annotations/core';
import type { Register, TextContent } from '@ghentcdh/mela/generated/types';
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
import { useModeStore } from './store/mode.store';
import { findRegister } from './utils/example';
import { AnnotationTester } from './utils/tester';
import type { TextWithAnnotations } from './utils/text';
import { getTextSelection } from './utils/translation';
import { changeAnnotationSelection } from './utils/warning';
import AnnotationMetadata from './view/annotation-metadata.vue';
import Links from './view/links.vue';
import Translations from './view/translations.vue';

const annotationType = ref<{ label: string; id: string }>(IdentifyColor[0]);

type Properties = {
  textWithAnnotations: TextWithAnnotations;
  activeAnnotation: W3CAnnotation;
  links: AnnotationWithRelations[];
  text: Text;
  textContent: SourceModel;
};
const properties = defineProps<Properties>();
let originalAnnotation: W3CAnnotation;
let originalMetadata: any;

const emits = defineEmits<{
  changeAnnotation: [W3CAnnotation];
  deleteAnnotation: [W3CAnnotation];
  saveAnnotation: [W3CAnnotation];
  closeAnnotation: [];
  saveExample: [ExampleDto];
}>();

const annotationMetadata = ref<{
  annotationType: { label: string; id: AnnotationMetadataType };
  register?: Register;
}>({
  annotationType: IdentifyColor[0],
});

const deleteAnnotation = (annotation: W3CAnnotation) => {
  emits('deleteAnnotation', annotation);
};

const deleteActiveAnnotation = () => {
  ModalService.showConfirm({
    title: 'Delete annotation',
    message: 'Are you sure to delete this annotation, all links will be lost?',
    onClose: (result) => {
      console.log('on close', result);
      if (result) {
        deleteAnnotation(properties.activeAnnotation);
      }
    },
  });
};

const saveActiveAnnotation = () => {
  if (annotationMetadata.value.annotationType.id === 'example') {
    emits('saveExample', {
      id: getExampleIdFromUri(exampleMetaData.value?.source),
      ...annotationMetadata.value,
    });
    return;
  }

  saveAnnotation(
    properties.textWithAnnotations.getAnnotation(
      properties.activeAnnotation.id,
    ),
  );
};

const saveAnnotation = (annotation: W3CAnnotation) => {
  emits('saveAnnotation', annotation);
};

const textAnnotation = computed(() => ({
  id: properties.activeAnnotation.id,
  ...findTextPositionSelector(properties.textContent.uri)(
    properties.activeAnnotation,
  )?.selector,
}));
const selectedText = computed(() =>
  getTextSelection(properties.textContent, textAnnotation.value),
);
const exampleMetaData = computed(() =>
  findExampleMetaData(properties.activeAnnotation),
);

// region datamodel
watch(
  () => properties.activeAnnotation,
  (n) => {
    const annotation = properties.activeAnnotation;
    const type = findTagging(annotation).value ?? 'phrase';
    originalAnnotation = cloneDeep(annotation);

    const annotationType =
      IdentifyColor.find((c) => c.id === type) ?? IdentifyColor[0];

    originalMetadata = {
      annotationType: annotationType,
      register: exampleMetaData.value?.value.register,
      text: selectedText.value,
      name: selectedText.value,
      textContent: {
        id: properties.textContent.id,
      },
      annotation: textAnnotation.value,
    };

    annotationMetadata.value = cloneDeep(originalMetadata);
  },
  { immediate: true },
);

watch(
  () => annotationMetadata.value.annotationType,
  () => {
    const annotation = properties.textWithAnnotations.changeType(
      properties.activeAnnotation.id,
      annotationType.value.id as AnnotationMetadataType,
    );
    emits('changeAnnotation', annotation);
  },
);

// endregion

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

// region Validation
const valid = ref(false);
const modeStore = useModeStore();

const onValid = (value: boolean) => {
  valid.value = value;

  if (
    !modeStore.activeMode &&
    !isEqual(annotationMetadata.value, originalMetadata)
  ) {
    modeStore.changeMode('edit');
  }
};
// endregion
</script>
