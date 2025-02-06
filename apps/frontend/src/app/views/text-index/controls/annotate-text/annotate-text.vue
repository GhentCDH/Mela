<template>
  <div class="flex flex-col gap-1">
    <AnnotatedText
      :lines="lines"
      :annotations="annotations"
      :allow-create="allowCreate"
      @annotation-create-begin="annotationCreate($event, 'start')"
      @annotation-create-end="annotationCreate($event, 'end')"
      @annotation-click="selectAnnotation"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
  AnnotatedText,
  createAnnotationColor,
  CreateAnnotationState,
} from '@ghentcdh/vue-component-annotated-text';
import { Annotation } from './w3c/types';

type Properties = {
  text: string;
  color: string;
  allowCreate: boolean;
  annotations: Annotation[];
};
const properties = withDefaults(defineProps<Properties>(), {
  text: '',
  color: '#f51720',
  allowCreate: false,
  annotations: [],
});

const lines = computed(() => {
  const lines = properties.text.split(`\n`);
  let start = 0;
  return lines.map((text, index) => {
    // Add additional 1 because the \n symbol consist of 2 characters
    const end = start + text.length + 1;
    const line = {
      start,
      end,
      id: `line-${index}`,
      text,
    };

    start = end;

    return line;
  });
});

const emits = defineEmits<{
  create: [annotation: Annotation];
  select: [annotation: Annotation];
}>();

const annotationCreate = (
  event: CreateAnnotationState,
  type: 'start' | 'end' | 'updating',
) => {
  if (type === 'start') {
    event.init({ color: createAnnotationColor(properties.color) });
    // activeAnnotation.value = event.annotation;
  } else if (type === 'end') {
    const annotation = event.getAnnotation();
    emits('create', annotation);
  }
};

const selectAnnotation = ({ annotation }: { annotation: Annotation }) => {
  emits('select', annotation);
};
</script>
