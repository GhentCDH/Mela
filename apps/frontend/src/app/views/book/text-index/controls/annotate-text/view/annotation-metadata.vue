<template>
  <fieldset
    v-for="item in metaData"
    :key="item.label"
    :class="['fieldset', item.valueOnNewLine ? '' : 'flex flex-col gap-2']"
  >
    <legend class="fieldset-legend">
      {{ item.label }}
    </legend>
    <div>
      {{ item.value }}
    </div>
  </fieldset>
  <div class="flex gap-2 justify-between pb-4">
    <div>
      <Btn
        v-if="allowEdit"
        :outline="true"
        @click="editAnnotation"
      >
        Edit
      </Btn>
    </div>
    <div class="flex gap-2 justify-end pb-4">
      <Btn
        :color="Color.error"
        @click="deleteAnnotation"
      >
        Delete
      </Btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { findExampleMetaData } from '@mela/text/shared';
import { computed } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  findTagging,
  findTextPositionSelector,
} from '@ghentcdh/annotations/core';
import { Btn, Color } from '@ghentcdh/ui';

import { useActiveAnnotationStore } from '../store/active-annotation.store';
import { ModalSelectionService } from './selection/modal-selection.service';
import { AnnotationTypeLabelValue } from '../../identify.color';
import { useAnnotationTreeStore } from '../store/annotation.tree.store';
import { AnnotationTester } from '../utils/tester';
import { getTextSelection } from '../utils/translation';

type Properties = {
  storeId: string;
  source: SourceModel;
  annotation: W3CAnnotation;
};
const properties = defineProps<Properties>();
const activeAnnotationStore = useActiveAnnotationStore(properties.storeId);
const treeStore = useAnnotationTreeStore(properties.storeId);

const annotationType = computed(() => {
  const id = findTagging(properties.annotation).value ?? 'phrase';

  return AnnotationTypeLabelValue[id];
});

const exampleMetaData = computed(() => {
  if (annotationType.value.key !== 'example') return null;

  return findExampleMetaData(properties.annotation)?.value;
});

const textAnnotation = computed(() => ({
  id: properties.annotation.id,
  ...findTextPositionSelector(properties.source.uri)(properties.annotation)
    ?.selector,
}));

const selectedText = computed(() => {
  return getTextSelection(properties.source, textAnnotation.value);
});

const allowEdit = computed(
  () => !AnnotationTester(properties.annotation).isNew(),
);

const metaData = computed(() => {
  return [
    {
      label: 'Selected text',
      value: selectedText.value,
      valueOnNewLine: true,
    },
    { label: 'Annotation type', value: annotationType.value.label },
    { label: 'Register', value: exampleMetaData.value?.register.name ?? null },
  ].filter((v) => v.value != null);
});

const deleteAnnotation = () => {
  activeAnnotationStore.delete(properties.annotation.id);
};

const editAnnotation = () => {
  ModalSelectionService.editSelection({
    parentAnnotation: treeStore.getParent(
      properties.source,
      properties.annotation,
    ),
    annotation: properties.annotation,
    source: properties.source,
    annotationType: annotationType.value.key,
    storeId: properties.storeId,
  });
};
</script>
