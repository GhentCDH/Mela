import { ref } from 'vue';
import { defineStore } from 'pinia';
import { W3CAnnotation } from '@ghentcdh/annotated-text';
import { useToast } from '../mode/useToast';
import { useAnnotationDefStore } from '../../store/annotation-def.store';
import { useAnnotationEditStore } from '../annotation-detail/AnnotationEdit.store';

type AnnotationLinkData = {
  annotation: W3CAnnotation;
  annotation1?: W3CAnnotation;
  type: string;
};

export const useAnnotationLink = defineStore('use-annotation-link', () => {
  const data = ref<AnnotationLinkData | null>(null);
  const annotationDefStore = useAnnotationDefStore();
  const annotationEditStore = useAnnotationEditStore();
  const toaster = useToast();
  const isVisible = ref(false);

  const startLink = (type: string, annotation: W3CAnnotation) => {
    data.value = { annotation, type };
    annotationEditStore.start();
    const label = annotationDefStore.definition[type].label;
    toaster.showToastWithAction(`Select annotation to ${label}`, {
      label: 'Cancel',
      onClick: () => {
        cancel();
      },
    });
  };

  const cancel = () => {
    isVisible.value = false;
    data.value = null;
    annotationEditStore.end();
    toaster.closeToast();
  };

  const selectLinkedAnnotation = (annotation1: W3CAnnotation) => {
    data.value = { ...data.value, annotation1 };
    isVisible.value = true;
  };

  return {
    startLink,
    cancel,
    selectLink: selectLinkedAnnotation,
    isVisible,
    data,
  };
});
