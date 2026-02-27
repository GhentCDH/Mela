import { defineStore } from 'pinia';
import { effect, ref } from 'vue';

import type { W3CAnnotation } from '@ghentcdh/annotated-text';

import { useModeStore } from './mode.store';

export const useAnnotationListenerStore = () =>
  defineStore('annotationListenerStore', () => {
    const clickAnnotation = ref<W3CAnnotation>(null);
    const modeStore = useModeStore();

    const onClickAnnotation = (annotation: W3CAnnotation | null) => {
      clickAnnotation.value = annotation;
    };

    effect(() => {
      const changed = modeStore.activeMode;
      onClickAnnotation(null);
    });

    return { clickAnnotation, onClickAnnotation };
  });
