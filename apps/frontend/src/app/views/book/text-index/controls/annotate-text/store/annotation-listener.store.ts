import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';

export const useAnnotationListenerStore = () =>
  defineStore('annotationListenerStore', () => {
    const clickAnnotation = ref<W3CAnnotation>(null);

    const onClickAnnotation = (annotation: W3CAnnotation | null) => {
      clickAnnotation.value = annotation;
    };

    return { clickAnnotation, onClickAnnotation };
  });
