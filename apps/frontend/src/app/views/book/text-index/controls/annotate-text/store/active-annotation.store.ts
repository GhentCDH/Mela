import { getAnnotationUri } from '@mela/text/shared';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { ModalService } from '@ghentcdh/ui';

import { useAnnotationStore } from './annotation.store';
import { useModeStore } from './mode.store';
import { AnnotationUtils } from '../utils/annotations.utils';
import { mapRelationsToLinks } from '../utils/links';
import { SourceUtils } from '../utils/source';

type SelectedIds = { textContentUri: string; annotationId: string };

export const useActiveAnnotationStore = (id: string) =>
  defineStore(`active_annotation_store_${id}`, () => {
    const annotationStore = useAnnotationStore(id);
    const modeStore = useModeStore();
    const selectedIds = ref<SelectedIds | null>(null);

    const activeAnnotation = computed(() =>
      AnnotationUtils(annotationStore.allAnnotations).byId(
        selectedIds.value?.annotationId,
      ),
    );
    const activeTextContent = computed(() =>
      SourceUtils(annotationStore.sources).getSourceByUri(
        selectedIds.value.textContentUri,
      ),
    );

    const activeAnnotationLinks = computed(() => {
      const annotationId = selectedIds.value?.annotationId;
      if (!annotationId) return [];

      const sourceUri = getAnnotationUri({ id: annotationId });

      return mapRelationsToLinks(sourceUri, annotationStore.allAnnotations);
    });

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
      selectAnnotation(null);
    };

    const selectAnnotation = (ids: {
      annotationId: string | undefined | null;
      textContentUri: string | undefined | null;
    }) => {
      resetSelection();
      if (!ids || !ids.textContentUri || !ids.annotationId) {
        // TODO  showAllTranslations();
        selectedIds.value = null;
        return null;
      }

      selectedIds.value = ids;
      return ids;
    };

    const resetSelection = () => {
      selectedIds.value = null;
    };

    return {
      delete: deleteAnnotation,
      close: closeAnnotation,

      selectAnnotation,

      activeAnnotation,
      activeTextContent,
      activeAnnotationLinks,
    };
  })();
