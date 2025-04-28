<template>
  <LinkComponent
    title="Lemmas"
    entity="lemma"
    :purpose="PURPOSE_LEMA"
    :display-value="displayValue"
    :links="links"
    @add-link="addLink"
    @delete="deleteAnnotation"
  />
</template>

<script setup lang="ts">
import { PURPOSE_LEMA } from '@mela/text/shared';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';

import type { AnnotationWithRelations } from '../props';
import LinkComponent from './link-component.vue';
import { useAnnotationStore } from '../store/annotation.store';
import { findTextValue } from '../utils/translation';
import { ModalSelectionService } from './selection/modal-selection.service';

type Properties = {
  annotation: W3CAnnotation;
  links: AnnotationWithRelations[];
  textContent: SourceModel;
  storeId: string;
};
const properties = defineProps<Properties>();
const annotationStore = useAnnotationStore(properties.storeId);

const displayValue = (link: AnnotationWithRelations): string => {
  const translation = link.relations.find(
    (r) => r.id !== properties.annotation.id,
  );

  return findTextValue(translation)?.value;
};

const addLink = () => {
  ModalSelectionService.createLemma({
    annotation: properties.annotation,
    textContent: properties.textContent,
  });
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  annotationStore.deleteAnnotation(annotation.id);
};
</script>
