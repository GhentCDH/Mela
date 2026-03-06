<template>
  <Collapse title="Annotation filter">
    <div class="flex flex-col gap-1">
      <div
        v-for="type in annotationDefStore.data"
        :key="type.id"
        class="flex gap-2"
      >
        <div
          class="w-5 border h-5 square"
          :style="{ backgroundColor: type.color }"
        />
        <Checkbox
          :label="type.name"
          :model-value="selectedTypes.includes(type.id)"
          @update:model-value="toggleType(type.id, $event)"
        />
      </div>
    </div>
  </Collapse>
</template>

<script setup lang="ts">
import { Checkbox, Collapse } from '@ghentcdh/ui';
import { type AnnotationType } from '../../text-index/controls/identify.color';
import { useAnnotationStore } from '../store/anntotation.store';
import { useAnnotationDefStore } from '../store/annotation-def.store';

const properties = defineProps<{
  storeId: string;
}>();

const annotationDefStore = useAnnotationDefStore();

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
