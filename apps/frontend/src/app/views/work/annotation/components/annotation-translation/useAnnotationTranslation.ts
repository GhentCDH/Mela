import { ref } from 'vue';
import { defineStore } from 'pinia';
import { W3CAnnotation } from '@ghentcdh/annotated-text';
import { useModeStore } from '../../../text-index/controls/annotate-text/store/mode.store';

export const useAnnotationTranslation = defineStore(
  'use-annotation-translation',
  () => {
    const annotation = ref<W3CAnnotation>(null);
    const translation = ref<W3CAnnotation>(null);
    const modeStore = useModeStore();
    const isVisible = ref(false);
    const startTranslation = (_annotation: W3CAnnotation) => {
      annotation.value = _annotation;
      modeStore.changeMode('translate');
    };

    const cancel = () => {
      annotation.value = null;
      translation.value = null;
      isVisible.value = false;
      modeStore.resetMode();
    };

    const selectTranslation = (_translation: W3CAnnotation) => {
      translation.value = _translation;
      isVisible.value = true;
    };

    return {
      startTranslation,
      cancel,
      selectTranslation,
      isVisible,
      annotation,
      translation,
    };
  },
);
