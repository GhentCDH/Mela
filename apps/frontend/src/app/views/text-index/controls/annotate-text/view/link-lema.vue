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
  />

  <LinkLemaModal :on-close="() => {}" :annotation="annotation" />
</template>

<script setup lang="ts">
import type { AnnotationType } from '@mela/text/shared';
import { PURPOSE_LEMA } from '@mela/text/shared';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { ModalService } from '@ghentcdh/ui';

import type { AnnotationWithRelations } from '../props';
import LinkComponent from './link-component.vue';
import type {
  LinkLemaModalProps,
  LinkLemaModalResult,
} from './link-lema-modal.props';
import LinkLemaModal from './link-lema-modal.vue';
import { useModeStore } from '../store/mode.store';
import { findTextValue } from '../utils/translation';

const modeStore = useModeStore();

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
  ModalService.openModal<LinkLemaModalProps, LinkLemaModalResult>({
    component: LinkLemaModal,
    props: {
      annotation: properties.annotation,
      onClose: (result: LinkLemaModalResult) => {
        alert(result);
      },
    },
  });
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  emits('delete', annotation);
};
</script>
