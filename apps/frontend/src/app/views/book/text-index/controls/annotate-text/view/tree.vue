<template>
  <li class="">
    <div
      :class="[
        {
          'menu-dropdown-toggle': property.children.length,
          'menu-dropdown-show': open,
        },
      ]"
      @click="selectCurrentAnnotation"
    >
      <div class="flex space-between items-center w-full">
        <div
          class="tooltip tooltip-right"
          :data-tip="property.content"
        >
          {{ property.type }}
        </div>
      </div>
    </div>
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

import type { TreeProp } from '../utils/tree';

const open = ref(true);
const properties = defineProps<{
  property: TreeProp;
}>();

const emits = defineEmits<{
  selectAnnotation: [id: string | null];
}>();

const selectCurrentAnnotation = () => {
  emits('selectAnnotation', properties.property.id);
};

const selectAnnotation = (annotation: string) => {
  emits('selectAnnotation', annotation);
};
</script>
