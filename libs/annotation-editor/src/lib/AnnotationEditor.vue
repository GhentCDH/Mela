<template>
  <div
    class="grid gap-2 py-2"
    :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }"
  >
    <Collapse
      :title="source.content.label"
      v-for="source in sources"
      :key="source.uri"
    >
      <SourceEdit v-bind="props" :source="source" :config="config" />
    </Collapse>
  </div>
  <AnnotationModal :config="annotationModal.config.value" />
</template>
<script lang="ts" setup>
import { AnnotationEditorProperties } from './AnnotationEditor.properties';
import SourceEdit from './components/SourceEdit.vue';
import { computed } from 'vue';
import { useAnnotationConfiguration } from './composables/annotationConfiguration';
import AnnotationModal from './modals/AnnotationModal.vue';
import { useAnnotationModal } from './modals/annotationModal.composable';
import { Collapse } from '@ghentcdh/ui';

const props = defineProps(AnnotationEditorProperties);

const config = computed(() => useAnnotationConfiguration(props));

const annotationModal = useAnnotationModal();
</script>
