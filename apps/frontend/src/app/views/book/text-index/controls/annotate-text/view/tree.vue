<template>
  <li>
    <div
      :class="[
        'hover:bg-gray-200 py-1',
        'border-l-2',
        'w-full ',
        {
          'border-gray-200': !active,
          'border-primary': active,
          'border-warning': isNew,
        },
      ]"
    >
      <div
        :class="['tooltip tooltip-right w-full', { 'text-primary': active }]"
        :style="{ 'padding-left': paddingLeft }"
        :data-tip="property.content"
      >
        <div class="flex items-center gap-2">
          <button
            class="text-left truncate w-full"
            @click="selectCurrentAnnotation"
          >
            <span
              v-if="isNew"
              class="text-warning"
            >NEW</span>
            {{ property.type }} - <small>{{ property.content }}</small>
          </button>
          <Btn
            :icon="IconEnum.Delete"
            :color="Color.blank"
            @click="deleteCurrentAnnotation"
          />
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
        :active-id="activeId"
        :level="level + 1"
        @select-annotation="selectAnnotation"
        @delete-annotation="deleteAnnotation"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { Btn, Color, IconEnum } from '@ghentcdh/ui';

import { AnnotationTester } from '../utils/tester';
import type { TreeProp } from '../utils/tree';

const defaultPadding = 8;
const open = ref(true);
const properties = defineProps<{
  property: TreeProp;
  level: number;
  activeId: string | null;
}>();
const emits = defineEmits<{
  selectAnnotation: [id: string | null];
  deleteAnnotation: [id: string];
}>();

const active = computed(() => properties.activeId === properties.property.id);
const isNew = computed(() => {
  return AnnotationTester(properties.property).isNew();
});
const paddingLeft = computed(() => {
  return properties.level * defaultPadding + 'px';
});

const deleteCurrentAnnotation = () => {
  emits('deleteAnnotation', properties.property.id);
};
const selectCurrentAnnotation = () => {
  emits('selectAnnotation', properties.property.id);
};

const selectAnnotation = (annotation: string) => {
  emits('selectAnnotation', annotation);
};
const deleteAnnotation = (annotation: string) => {
  emits('deleteAnnotation', annotation);
};
</script>
