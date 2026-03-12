<template>
  <Collapse title="Annotation filter">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs text-base-content/50">
        {{ selectedTypes.length === 0 ? 'All' : selectedTypes.length }} of
        {{ annotationDefStore.definitions.length }} types
      </span>
      <div class="flex gap-1">
        <button
          class="btn btn-ghost btn-xs"
          @click="selectAll"
        >
          All
        </button>
        <button
          class="btn btn-ghost btn-xs"
          @click="selectNone"
        >
          None
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label
        v-for="type in annotationDefStore.definitions"
        :key="type.id"
        class="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-colors hover:bg-base-200"
        :class="{
          'bg-base-200/60': isSelected(type.id),
        }"
      >
        <input
          type="checkbox"
          class="checkbox checkbox-sm"
          :checked="isSelected(type.id)"
          @change="toggleType(type.id, ($event.target as HTMLInputElement).checked)"
        >
        <span
          class="w-3 h-3 rounded-full shrink-0 ring-1 ring-black/10"
          :style="{
            backgroundColor: type.style.default.backgroundColor,
          }"
        />
        <span class="text-sm flex-1 select-none">{{ type.label }}</span>
        <span
          v-if="getAnnotationCount(type.id) > 0"
          class="badge badge-sm badge-ghost"
        >
          {{ getAnnotationCount(type.id) }}
        </span>
      </label>
    </div>
  </Collapse>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Collapse } from '@ghentcdh/ui';
import { type AnnotationType } from '../../text-index/controls/identify.color';
import { useAnnotationStore } from '../store/anntotation.store';
import { useAnnotationDefStore } from '../store/annotation-def.store';
import { findPurposeLowerCase } from '../../../../style/annotation.style';

const properties = defineProps<{
  storeId: string;
}>();

const annotationDefStore = useAnnotationDefStore();

const store = useAnnotationStore(properties.storeId);
const selectedTypes = store.selectedAnnotationTypes;

const isSelected = (type: AnnotationType) => selectedTypes.includes(type);

const annotationCounts = computed(() => {
  const counts: Record<string, number> = {};
  const annotations = store.annotations;
  if (!annotations) return counts;
  for (const annotation of annotations) {
    const purpose = findPurposeLowerCase(annotation) as string;
    counts[purpose] = (counts[purpose] ?? 0) + 1;
  }
  return counts;
});

const getAnnotationCount = (type: string) => annotationCounts.value[type] ?? 0;

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

const selectAll = () => {
  selectedTypes.splice(0, selectedTypes.length);
  annotationDefStore.definitions.forEach((def) => {
    selectedTypes.push(def.id as AnnotationType);
  });
};

const selectNone = () => {
  selectedTypes.splice(0, selectedTypes.length);
};
</script>
