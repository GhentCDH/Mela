import { ref } from 'vue';
import { defineStore } from 'pinia';
import { SourceModel, W3CAnnotation } from '@ghentcdh/annotated-text';

type CreateAnnotationData = {
  type: string;
  source: SourceModel;
  parentAnnotation?: W3CAnnotation;
};

type AnnotationSelectData = CreateAnnotationData & {
  annotation?: W3CAnnotation;
  type: string;
};

export const useAnnotationSelect = defineStore('use-annotation-select', () => {
  const data = ref<AnnotationSelectData | null>(null);
  const isVisible = ref(false);

  const createAnnotation = (_data: CreateAnnotationData) => {
    isVisible.value = true;
    data.value = { ..._data };
  };

  const editAnnotation = (
    _data: CreateAnnotationData,
    annotation: W3CAnnotation,
  ) => {
    isVisible.value = true;
    data.value = { ..._data, annotation };
  };

  const cancel = () => {
    isVisible.value = false;
    data.value = null;
  };
  return {
    createAnnotation,
    editAnnotation,
    cancel,
    isVisible,
    data,
  };
});
