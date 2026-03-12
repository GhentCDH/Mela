<template>
  <Drawer class="_h-full" :width-left="300" :width-right="20">
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
    <template #left-drawer>
      <div class="gap-2 flex flex-col">
        <SectionsMenu />
        <AnnotationFilter :store-id="storeId" />
      </div>
    </template>
  </Drawer>
  <EditToast
    v-if="toastStore.isVisible"
    :store-id="storeId"
    v-bind="toastStore.data"
  />

  <AnnotationEditCard
    v-if="annotationInfo.isVisible"
    v-bind="annotationInfo.data"
    :store-id="storeId"
    @close="annotationInfo.hide()"
  />
  <AnnotationLinkModal
    v-if="annotationLink.isVisible"
    v-bind="annotationLink.data"
    :store-id="storeId"
  />
  <AnnotationSelectModal
    v-if="annotationSelect.isVisible"
    v-bind="annotationSelect.data"
    :store-id="storeId"
  />
</template>
<script setup lang="ts">
import { useSectionStore } from '../section-store';
import { useAnnotationStore } from './store/anntotation.store';
import ContentEdit from './components/content-edit.vue';
import AnnotationFilter from './components/annotation-filter.vue';
import { Drawer, Loading } from '@ghentcdh/ui';
import AnnotationEditCard from './components/annotation-detail/AnnotationEditCard.vue';
import { useAnnotationInfo } from './components/annotation-detail/useAnnotationInfo';
import EditToast from './components/mode/edit-toast.vue';
import AnnotationLinkModal from './components/annotation-modal/AnnotationLinkModal.vue';
import AnnotationSelectModal from './components/annotation-modal/AnnotationSelectModal.vue';
import { useAnnotationLink } from './components/annotation-modal/useAnnotationLink';
import { useAnnotationSelect } from './components/annotation-modal/useAnnotationSelect';
import { useToast } from './components/mode/useToast';
import SectionsMenu from '../components/SectionsMenu.vue';

const storeId = `identify_and_translate_${Date.now()}`;

const sectionStore = useSectionStore();
const annotationStore = useAnnotationStore(storeId);
const annotationInfo = useAnnotationInfo();
const annotationLink = useAnnotationLink();
const annotationSelect = useAnnotationSelect();
const toastStore = useToast();
</script>
