<template>
  <div class="flex gap-3">
    <div class="w-[300px] h-full pr-2">
      <AnnotationTree
        :store-id="storeId"
        :filter="annotationStore.filter"
        :annotations="annotationStore.annotations"
        :chapters="bookStore.chapters"
        :active-chapter="bookStore.chapter"
        :sources="annotationStore.sources"
        @change-filter="annotationStore.changeFilter"
      />
    </div>
    <div class="flex-1 w-full">
      <div class="grid grid-cols-2">
        <AnnotationView
          v-for="source in annotationStore.sources"
          :key="source.uri"
          :source="source"
          :annotations="annotations"
          :selected-annotations="selectedAnnotationIds"
          :store-id="storeId"
        />
      </div>
    </div>
    <div class="w-[300px]">
      <template v-if="activeAnnotationStore.activeAnnotation">
        <ActiveAnnotation
          :active-annotation="activeAnnotationStore.activeAnnotation"
          :store-id="storeId"
          :links="activeAnnotationStore.activeAnnotationLinks"
          :text="textStore.text"
          :text-content="activeAnnotationStore.activeTextContent"
          @change-select-filter="annotationStore.changeSelectionFilter"
        />
      </template>
      <template v-else>
        <div class="flex flex-col gap-2 w-4/5">
          <Btn
            v-for="source of annotationStore.sources"
            :key="source.id"
            :outline="true"
            @click="createAnnotation(source)"
          >
            Create Paragraph for
            <strong>{{ source.content.label.toLowerCase() }}</strong>
          </Btn>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { SourceModel } from '@ghentcdh/annotations/core';
import { Btn } from '@ghentcdh/ui';

import ActiveAnnotation from './active-annotation.vue';
import AnnotationView from './annotation-view.vue';
import { useActiveAnnotationStore } from './store/active-annotation.store';
import { useAnnotationListenerStore } from './store/annotation-listener.store';
import { useAnnotationStore } from './store/annotation.store';
import { useModeStore } from './store/mode.store';
import { useBookStore } from '../../../book.store';
import { useTextStore } from '../../text.store';
import AnnotationTree from './view/annotation-tree.vue';
import { ModalSelectionService } from './view/selection/modal-selection.service';

type Properties = { storeId: string };
const properties = defineProps<Properties>();
const bookStore = useBookStore();

const selectedAnnotationIds = computed(() => {
  const activeAnnotations = new Set<string>();

  if (activeAnnotationStore.activeAnnotation?.id) {
    activeAnnotations.add(activeAnnotationStore.activeAnnotation?.id);

    activeAnnotationStore.activeAnnotationLinks.forEach((a) => {
      activeAnnotations.add(a.annotation.id);
      a.relations.forEach((r) => {
        activeAnnotations.add(r.id);
      });
    });
  }
  const annotations = Array.from(activeAnnotations);

  return annotations;
});

// TODO add id
const listenerStore = useAnnotationListenerStore()();
const textStore = useTextStore();
const annotationStore = useAnnotationStore(properties.storeId);
const activeAnnotationStore = useActiveAnnotationStore(properties.storeId);
const modeStore = useModeStore();

const annotations = computed(() => annotationStore.annotations);

// TODO if you click somewhere else also deselect the annotation
const onSelectAnnotation = async (
  textContentUri: string | null,
  annotationId: string | null,
) => {
  listenerStore.onClickAnnotation(annotationStore.getAnnotation(annotationId));

  if (modeStore.activeMode) {
    return;
  }

  const confirmed = { confirmed: true };

  if (!confirmed.confirmed) return;

  activeAnnotationStore.selectAnnotation({ textContentUri, annotationId });
};

const createAnnotation = (source: SourceModel) => {
  ModalSelectionService.createSelection({
    source: source,
    annotationType: 'paragraph',
    storeId: properties.storeId,
    onClose: (result) => {
      if (result?.valid) {
        const annotation = result.data;
        activeAnnotationStore.selectAnnotation({
          textContentUri: source.uri,
          annotationId: annotation.id,
        });
      }
    },
  });
};
</script>
