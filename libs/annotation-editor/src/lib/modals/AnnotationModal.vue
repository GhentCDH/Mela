<template>
  <template
    v-for="{ key, component: comp, state } in config?.modals"
    :key="key"
  >
    <component
      v-if="state.isVisible && state.data"
      :is="comp"
      v-bind="state.data"
      @close="state.close()"
    />
  </template>
</template>
<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { AnnotationModalProperties } from './AnnotationModal.properties';

const props = defineProps(AnnotationModalProperties);

onUnmounted(() => {
  props.config?.destroy();
});
</script>
