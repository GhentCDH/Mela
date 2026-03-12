<template>
  <div
    class="grid gap-2 py-2"
    :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }"
  >
    <SourceEdit
      v-for="source in sources"
      :key="source.uri"
      v-bind="props"
      :source="source"
      :config="config"
    />
  </div>
</template>
<script lang="ts" setup>
import { AnnotationEditorProperties } from './AnnotationEditor.properties';
import SourceEdit from './components/SourceEdit.vue';
import { computed } from 'vue';
import { useAnnotationConfiguration } from './composables/annotationConfiguration';

const props = defineProps(AnnotationEditorProperties);

const config = computed(() => useAnnotationConfiguration(props));
</script>
