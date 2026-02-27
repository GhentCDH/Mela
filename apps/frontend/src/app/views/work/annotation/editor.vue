<template>
  <annotate-text :store-id="storeId" />
</template>
<script setup lang="ts">
import { useSectionStore } from '../section-store';
import AnnotateText from '../text-index/controls/annotate-text/annotate-text.vue';
import { useAnnotationStore } from '../text-index/controls/annotate-text/store/annotation.store';

const storeId = `identify_and_translate_${Date.now()}`;

const sectionStore = useSectionStore();
const annotationStore = useAnnotationStore(storeId);
</script>
