<template>
  <li class="">
    <span
      :class="[
        {
          'menu-dropdown-toggle': property.children.length,
          'menu-dropdown-show': open,
        },
      ]"
      @click="selectCurrentAnnotation"
    >
      <div
        class="tooltip tooltip-right"
        :data-tip="property.content"
      >
        {{ property.type }}
      </div>
    </span>
    <ul
      v-if="property.children"
      :class="['menu-dropdown', { 'menu-dropdown-show': open }]"
    >
      <Tree
        v-for="annotation of property.children"
        :key="annotation.id"
        :property="annotation"
        @select-annotation="selectAnnotation"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { SourceModel } from '@ghentcdh/annotations/core';

import type { TreeProp } from '../utils/tree';

const open = ref(true);
const properties = defineProps<{
  property: TreeProp;
  source: SourceModel;
}>();

const emits = defineEmits<{
  selectAnnotation: [id: string | null, textContentUri: string | null];
}>();

const selectCurrentAnnotation = () => {
  emits('selectAnnotation', properties.property.id);
};

const selectAnnotation = (annotation: string) => {
  emits('selectAnnotation', annotation);
};
</script>
