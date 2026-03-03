<template>
  <AnnotationEditCard
    v-if="annotationInfo.isVisible"
    :position="annotationInfo.position"
    :data="annotationInfo.data"
    :storeId="storeId"
    @close="annotationInfo.hide()"
  />
  <Drawer class="_h-full" :width-left="300" :width-right="300">
    <Loading :loading="!sectionStore.section" />
    <div class="grid grid-cols-2 gap-2">
      <content-edit
        v-for="source in sectionStore.sources"
        :key="source.uri"
        :source="source"
        :store-id="storeId"
        :annotations="annotationStore.annotations"
      />
    </div>
    <template #left-drawer />
  </Drawer>
</template>
<script setup lang="ts">
import { useSectionStore } from '../section-store';
import { useAnnotationStore } from './store/anntotation.store';
import ContentEdit from './components/content-edit.vue';
import { Drawer, Loading } from '@ghentcdh/ui';
import AnnotationEditCard from './components/annotation-detail/AnnotationEditCard.vue';
import { useAnnotationInfo } from './components/annotation-detail/useAnnotationInfo';

const storeId = `identify_and_translate_${Date.now()}`;

const sectionStore = useSectionStore();
const annotationStore = useAnnotationStore(storeId);
const annotationInfo = useAnnotationInfo();
</script>
