import { defineStore } from 'pinia';

import { ModalService } from '@ghentcdh/ui';

import { useAnnotationStore } from './annotation.store';
import { useModeStore } from './mode.store';

export const useActiveAnnotationStore = (id: string) =>
  defineStore(`active_annotation_store_${id}`, () => {
    const annotationStore = useAnnotationStore(id);
    const modeStore = useModeStore();

    const deleteAnnotation = async (annotationId: string, close?: boolean) => {
      ModalService.showConfirm({
        title: 'Delete annotation',
        message:
          'Are you sure to delete this annotation, all links will be lost?',
        onClose: (result) => {
          if (result.confirmed) {
            annotationStore.deleteAnnotation(annotationId);
            if (close) {
              closeAnnotation();
            }
          }
        },
      });
    };

    const closeAnnotation = () => {
      modeStore.resetMode();
      annotationStore.selectAnnotation(null);
    };

    return {
      delete: deleteAnnotation,
      close: closeAnnotation,
    };
  })();
