import { ref } from 'vue';
import { defineStore } from 'pinia';
import { SourceModel, W3CAnnotation } from '@ghentcdh/annotated-text';

export type AnnotationInfoState = {
  annotation: W3CAnnotation;
  source: SourceModel;
};

export const useAnnotationInfo = defineStore('use-annotation-info', () => {
  const isVisible = ref(false);
  const position = ref({ x: 0, y: 0 });
  const data = ref<AnnotationInfoState | null>(null);

  const show = (e: MouseEvent, popupData?: AnnotationInfoState) => {
    // Keep popup in viewport
    const x = Math.min(e.clientX, window.innerWidth - 270);
    const y = Math.min(e.clientY, window.innerHeight - 200);

    position.value = { x, y };
    data.value = popupData;
    isVisible.value = true;
  };

  const hide = () => {
    isVisible.value = false;
    data.value = null;
  };

  return { isVisible, position, data, show, hide };
});
