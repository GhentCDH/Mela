<template>
  <Navbar :actions="actions" />
</template>

<script setup lang="ts">
import { IconEnum } from '@ghentcdh/ui';
import type { SourceModel } from '@mela/text/shared';
import type { AnnotationType as Type } from '../../text-index/controls/identify.color';
import Navbar, { NavbarAction } from './navbar.vue';
import { useAnnotationSelect } from './annotation-modal/useAnnotationSelect';

const properties = defineProps<{
  source: SourceModel;
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
  useAnnotationSelect().createAnnotation({
    source: properties.source,
    type: annotationType,
  });
};
</script>
