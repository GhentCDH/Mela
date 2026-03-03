<template>
  <Collapse title="Annotation filter">
    <div class="flex flex-col gap-1">
      <Checkbox
        v-for="type in AnnotationTypeLabelValues"
        :key="type.key"
        :label="type.label"
        :model-value="selectedTypes.includes(type.key)"
        @update:model-value="toggleType(type.key, $event)"
      />
    </div>
  </Collapse>
</template>

<script setup lang="ts">
import { Checkbox, Collapse } from '@ghentcdh/ui';
import {
  AnnotationTypeLabelValues,
  type AnnotationType,
} from '../../text-index/controls/identify.color';
import { useAnnotationStore } from '../store/anntotation.store';

const properties = defineProps<{
  storeId: string;
}>();

const store = useAnnotationStore(properties.storeId);
const selectedTypes = store.selectedAnnotationTypes;

const toggleType = (type: AnnotationType, checked: boolean) => {
  if (checked) {
    selectedTypes.push(type);
  } else {
    const index = selectedTypes.indexOf(type);
    if (index > -1) {
      selectedTypes.splice(index, 1);
    }
  }
};
</script>