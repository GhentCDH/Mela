<template>
  <LinkComponent
    title="Lemas"
    entity="lema"
    :purpose="PURPOSE_LEMA"
    :display-value="displayValue"
    :links="links"
    :text="text"
    @add-link="addLink"
    @delete="deleteAnnotation"
  >
  </LinkComponent>
</template>

<script setup lang="ts">
import { AnnotationType, PURPOSE_LEMA } from '@mela/text/shared';
import { computed } from 'vue';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';

import type { AnnotationWithRelations } from '../props';
import LinkComponent from './link-component.vue';
import { useAnnotationListenerStore } from '../store/annotation-listener.store';
import { useModeStore } from '../store/mode.store';
import { findTextValue } from '../utils/translation';

const listenerStore = useAnnotationListenerStore()();

const modeStore = useModeStore();

const linkTranslation = computed(() => modeStore.activeMode === 'translate');

type Properties = {
  annotation: W3CAnnotation;
  links: AnnotationWithRelations[];
  text: Text;
};
const properties = defineProps<Properties>();
const emits = defineEmits<{
  save: [string | null, AnnotationType];
  delete: [W3CAnnotation];
}>();

const displayValue = (link: AnnotationWithRelations): string => {
  const translation = link.relations.find(
    (r) => r.id !== properties.annotation.id,
  );

  return findTextValue(translation)?.value;
};
const addLink = () => {
  alert('create a lema');
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  emits('delete', annotation);
};
</script>
