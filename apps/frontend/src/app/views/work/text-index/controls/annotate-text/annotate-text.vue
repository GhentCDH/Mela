<template>
  <Drawer
    class="h-full"
    :width-left="300"
    :width-right="300"
  >
    <template #left-drawer>
      <AnnotationTree
        :store-id="storeId"
        :filter="annotationStore.filter"
        :annotations="annotationStore.annotations"
        :sections="workStore.sections"
        :active-section="sectionStore.section"
        :sources="annotationStore.sources"
        @change-filter="annotationStore.changeFilter"
      />
    </template>
    <template #right-drawer>
      <div class="mt-6">
        <template v-if="activeAnnotationStore.activeAnnotation">
          <!--          <ActiveAnnotation-->
          <!--            :active-annotation="activeAnnotationStore.activeAnnotation"-->
          <!--            :store-id="storeId"-->
          <!--            :links="activeAnnotationStore.activeAnnotationLinks"-->
          <!--            :text="sectionStore.section"-->
          <!--            :text-content="activeAnnotationStore.activeTextContent"-->
          <!--            @change-select-filter="annotationStore.changeSelectionFilter"-->
          <!--          />-->
        </template>
        <template v-else>
          <div class="flex flex-col gap-2 w-4/5">
            <Btn
              v-for="source of annotationStore.sources"
              :key="source.id"
              :outline="true"
              `
              @click="createAnnotation(source)"
            >
              Create Paragraph for
              <strong>{{ source.content.label.toLowerCase() }}</strong>
            </Btn>
          </div>
        </template>
      </div>
    </template>

    <Loading :loading="!sectionStore.section" />
    <div class="grid grid-cols-2 gap-2 m-2">
      <Collapse
        v-for="source in sectionStore.sources"
        :key="source.id"
        :title="source.content.label"
        :default-opened="true"
      >
        <AnnotationView
          :key="source.uri"
          :source="source"
          :annotations="annotations"
          :selected-annotations="selectedAnnotationIds"
          :store-id="storeId"
        />
      </Collapse>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import type { SourceModel } from '@mela/text/shared';
import { computed } from 'vue';

import { Btn, Collapse, Drawer, Loading } from '@ghentcdh/ui';
import AnnotationView from './annotation-view.vue';
import { useActiveAnnotationStore } from './store/active-annotation.store';
import { useAnnotationListenerStore } from './store/annotation-listener.store';
import { useAnnotationStore } from './store/annotation.store';
import { useModeStore } from './store/mode.store';
import { ModalSelectionService } from './view/selection/modal-selection.service';
import { useSectionStore } from '../../../section-store';
import { useWorkStore } from '../../../work.store';
import AnnotationTree from './view/annotation-tree.vue';

type Properties = { storeId: string };
const properties = defineProps<Properties>();
const sectionStore = useSectionStore();
const workStore = useWorkStore();

const selectedAnnotationIds = computed(() => {
  return activeAnnotationStore.activeAnnotation?.id
    ? [activeAnnotationStore.activeAnnotation?.id]
    : [];
});

// TODO add id
const listenerStore = useAnnotationListenerStore()();
// const textStore = useTextStore();
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
