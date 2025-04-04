<template>
  <LinkComponent
    title="Lemas"
    entity="lema"
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
import { onMounted } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import type { Text } from '@ghentcdh/mela/generated/types';
import { ModalService } from '@ghentcdh/ui';

import type { AnnotationWithRelations } from '../props';
import LinkComponent from './link-component.vue';
import type {
  LinkLemaModalProps,
  LinkLemaModalResult,
} from './link-lema-modal.props';
import LinkLemaModal from './link-lema-modal.vue';
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
  ModalService.openModal<LinkLemaModalProps, LinkLemaModalResult>({
    component: LinkLemaModal,
    props: {
      annotation: properties.annotation,
      textContent: properties.textContent,
      onClose: (result: LinkLemaModalResult) => {
        console.log('onClose');
        console.log(result);
        if (result?.valid) emits('save', null, result.data);
      },
    },
  });
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  emits('delete', annotation);
};

onMounted(() => addLink());
</script>
