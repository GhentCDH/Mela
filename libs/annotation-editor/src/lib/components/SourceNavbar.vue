<template>
  <Navbar :actions="actions" />
</template>

<script setup lang="ts">
import { IconEnum } from '@ghentcdh/ui';
import { AnnotationConfiguration } from '../types/AnnotationConfiguration.model';
import { computed, PropType } from 'vue';
import Navbar from './navbar.vue';
import type { NavbarAction } from './navbar.properties';

const properties = defineProps({
  config: { type: Object as PropType<AnnotationConfiguration>, required: true },
});

const actions: NavbarAction[] = computed(() => [
  {
    icon: IconEnum.Plus,
    label: 'Add',
    children: properties.config.rootTypes.map((type) => ({
      action: () => createAnnotation(type.key),
      label: type.label,
    })),
  },
]);

const createAnnotation = (annotationType: string) => {
  alert('create annotation');
};
</script>
