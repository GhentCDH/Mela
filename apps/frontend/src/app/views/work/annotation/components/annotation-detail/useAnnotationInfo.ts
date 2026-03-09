import { ref } from 'vue';
import { defineStore } from 'pinia';
import { SourceModel, W3CAnnotation } from '@ghentcdh/annotated-text';

export type AnnotationInfoState = {
  annotation: W3CAnnotation;
  source: SourceModel;
  position: { x: number; y: number };
};

export const useAnnotationInfo = defineStore('use-annotation-info', () => {
  const isVisible = ref(false);
  const data = ref<AnnotationInfoState | null>(null);

  const show = (e: MouseEvent, popupData?: AnnotationInfoState) => {
    // Keep popup in viewport
    const x = Math.min(e.clientX, window.innerWidth - 270);
    const y = Math.min(e.clientY, window.innerHeight - 200);

    data.value = { ...popupData, position: { x, y } };
    isVisible.value = true;
  };

  const hide = () => {
    isVisible.value = false;
    data.value = null;
  };

  return { isVisible, data, show, hide };
});
