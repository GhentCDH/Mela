import { ref } from 'vue';
import { defineStore } from 'pinia';
import { W3CAnnotation } from '@ghentcdh/annotated-text';
import { useToast } from '../mode/useToast';
import { useAnnotationDefStore } from '../../store/annotation-def.store';

type AnnotationLinkData = {
  annotation: W3CAnnotation;
  annotation1?: W3CAnnotation;
  type: string;
};

export const useAnnotationLink = defineStore('use-annotation-link', () => {
  const data = ref<AnnotationLinkData | null>(null);
  const annotationDefStore = useAnnotationDefStore();
  const toaster = useToast();
  const isVisible = ref(false);
  const isActive = ref(false);

  const startLink = (type: string, annotation: W3CAnnotation) => {
    data.value = { annotation, type };
    isActive.value = true;
    const label = annotationDefStore.definition[type].label;
    toaster.showToastWithAction(`Select annotation to ${label}`, {
      label: 'Cancel',
      onClick: () => {
        //
      },
    });
  };

  const cancel = () => {
    isVisible.value = false;
    isActive.value = false;
    data.value = null;
    toaster.closeToast();
  };

  const selectLinkedAnnotation = (annotation1: W3CAnnotation) => {
    data.value = { ...data.value, annotation1 };
    isVisible.value = true;
  };

  return {
    isActive,
    startLink,
    cancel,
    selectLink: selectLinkedAnnotation,
    isVisible,
    data,
  };
});
