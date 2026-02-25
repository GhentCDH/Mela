<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      Selected text
    </legend>
    <div :id="id" />
  </fieldset>
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
import type { SourceModel } from '@mela/text/shared';
import { findExampleMetaData, findLemmaMetaData } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';
import { computed, onMounted, onUnmounted, watch } from 'vue';

import type { AnnotatedText, W3CAnnotation } from '@ghentcdh/annotated-text';
import {
  MarkdownTextAdapter,
  W3CAnnotationAdapter,
  createAnnotatedText,
  findTagging,
  findTextPositionSelector,
} from '@ghentcdh/annotated-text';
import { Btn, Color } from '@ghentcdh/ui';

import { useActiveAnnotationStore } from '../store/active-annotation.store';
import { ModalSelectionService } from './selection/modal-selection.service';
import {
  AnnotationTypeLabelValue,
  colorForAnnotationType,
} from '../../identify.color';
import { useAnnotationTreeStore } from '../store/annotation.tree.store';
import { AnnotationTester } from '../utils/tester';

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
  if (annotationType.value.key !== 'example') return [];

  const metadata = findExampleMetaData(properties.annotation)?.value;

  return [{ label: 'Register', value: metadata.register.name ?? null }];
});

const lemmaMetadata = computed(() => {
  if (annotationType.value.key !== 'lemma') return [];

  const metadata = findLemmaMetaData(properties.annotation)?.value;
  return [{ label: 'Lemma', value: metadata?.word ?? null }];
});

const textAnnotation = computed(() => ({
  id: properties.annotation.id,
  ...findTextPositionSelector(properties.source.uri)(properties.annotation)
    ?.selector,
}));

const allowEdit = computed(
  () => !AnnotationTester(properties.annotation).isNew(),
);

const metaData = computed(() => {
  return [
    {
      label: 'Annotation type',
      value: annotationType.value.label,
      valueOnNewLine: false,
    },
    exampleMetaData.value,

    lemmaMetadata.value,
  ].flat();
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
const id = `annotated-metadata-view--${uuidv4()}`;

let annotatedText: AnnotatedText<W3CAnnotation>;

const getLimit = () => {
  return {
    start: textAnnotation.value.start,
    end: textAnnotation.value.end,
    ignoreLines: true,
  };
};

onMounted(() => {
  annotatedText = createAnnotatedText(id, {
    text: MarkdownTextAdapter({
      limit: getLimit(),
    }),
    annotation: W3CAnnotationAdapter({
      source: properties.source.uri,
      // TODO add annotation colors
      colorFn: colorForAnnotationType,
    }),
  }).setText(properties.source.content.text);
});
watch(
  () => properties.annotation,
  (newVal, oldVal) => {
    annotatedText?.changeTextAdapterConfig('limit', getLimit());
  },
);

onUnmounted(() => {
  annotatedText?.destroy();
});
</script>
