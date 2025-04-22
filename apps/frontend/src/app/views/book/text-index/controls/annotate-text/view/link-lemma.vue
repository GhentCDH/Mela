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
import type { AnnotationType } from '@mela/text/shared';
import { PURPOSE_LEMA } from '@mela/text/shared';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import type { Text } from '@ghentcdh/mela/generated/types';
import { ModalService } from '@ghentcdh/ui';

import type { AnnotationWithRelations } from '../props';
import LinkComponent from './link-component.vue';
import type {
  LinkLemmaModalProps,
  LinkLemmaModalResult,
} from './link-lemma-modal.props';
import LinkLemmaModal from './link-lemma-modal.vue';
import { findTextValue } from '../utils/translation';

type Properties = {
  annotation: W3CAnnotation;
  links: AnnotationWithRelations[];
  text: Text;
  textContent: SourceModel;
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
  ModalService.openModal<LinkLemmaModalProps, LinkLemmaModalResult>({
    component: LinkLemmaModal,
    props: {
      annotation: properties.annotation,
      textContent: properties.textContent,
      onClose: (result: LinkLemmaModalResult) => {
        if (result?.valid) emits('save', null, result.data);
      },
    },
  });
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  emits('delete', annotation);
};
</script>
