<template>
  <Navbar :actions="actions" />
</template>

<script setup lang="ts">
import { IconEnum } from '@ghentcdh/ui';
import type { SourceModel } from '@mela/text/shared';
import { ModalSelectionService } from '../../text-index/controls/annotate-text/view/selection/modal-selection.service';
import type { AnnotationType as Type } from '../../text-index/controls/identify.color';
import Navbar, { NavbarAction } from './navbar.vue';

const properties = defineProps<{
  source: SourceModel;
  storeId: string;
}>();

const actions: NavbarAction[] = [
  {
    icon: IconEnum.Plus,
    label: 'Add',
    children: [
      {
        label: 'Add paragraph',
        action: () => {
          createAnnotation('paragraph');
        },
      },
      {
        label: 'Add subsection',
        action: () => {
          createAnnotation('subsection');
        },
      },
    ],
  },
];

const createAnnotation = (annotationType: Type) => {
  ModalSelectionService.createSelection({
    source: properties.source,
    annotationType,
    storeId: properties.storeId,
    onClose: (result) => {},
  });
};
</script>
