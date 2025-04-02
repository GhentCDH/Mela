<template>
  <h2>{{ title }}</h2>

  <ul class="list">
    <li
      v-for="t in linksByPurpose"
      :key="t.link.id"
      class="list-row !px-0 !gap-2"
    >
      <div>{{ t.translation }}</div>
      <Btn
        :color="Color.secondary"
        :icon="IconEnum.Delete"
        @click="deleteAnnotation(t.link)"
      />
    </li>
  </ul>
  <fieldset
    v-if="newLink"
    class="fieldset"
  >
    <legend class="fieldset-legend">
      Selected {{ entity }}
    </legend>

    <slot />
  </fieldset>
  <Btn
    v-if="!newLink"
    @click="addLink"
  >
    Add {{ entity }}
  </Btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { findByPurposeValue } from '@ghentcdh/annotations/core';
import { Btn, Color, IconEnum, ModalService } from '@ghentcdh/ui';

import type { AnnotationWithRelations } from '../props';

type Properties = {
  title: string;
  entity: string;
  links: AnnotationWithRelations[];
  purpose: string;
  newLink: AnnotationWithRelations;
  displayValue: (link: AnnotationWithRelations) => string;
};
const properties = defineProps<Properties>();
const emits = defineEmits<{
  addLink: [];
  delete: [W3CAnnotation];
}>();

const linksByPurpose = computed(() =>
  properties.links
    .filter((link) => findByPurposeValue(properties.purpose)(link.annotation))
    .map((link) => {
      return {
        link: link.annotation,
        translation: properties.displayValue(link),
      };
    }),
);
const addLink = () => {
  emits('addLink');
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  ModalService.showConfirm({
    title: 'Delete link',
    message: `Are you sure to delete this ${properties.entity}`,
    onClose: (result) => {
      if (result.confirmed) {
        emits('delete', annotation);
      }
    },
  });
};
</script>
