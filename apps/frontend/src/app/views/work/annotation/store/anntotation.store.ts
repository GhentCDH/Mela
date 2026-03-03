import { defineStore } from 'pinia';
import { useSectionRepository } from '../../../../repository/section.repository';
import { computed, watch } from 'vue';
import { W3CAnnotation } from '@ghentcdh/annotated-text';
import { ModalService } from '@ghentcdh/ui';
import { useAnnotationRepository } from '../../../../repository/annotation.repository';
import type { AnnotationType } from '@mela/text/shared';
import { AnnotationTester } from '../../text-index/controls/annotate-text/utils/tester';
import { DataStore } from '../../../../repository/data.store';
import { useRouteParams } from '../../../../utils/useRouteParams';

export const useAnnotationStore = (id: string) =>
  defineStore(`annotation_store_${id}`, () => {
    const params = useRouteParams();
    const sectionRepository = useSectionRepository();
    const annotationRepository = useAnnotationRepository();

    const annotationDataStore = new DataStore<W3CAnnotation[], W3CAnnotation>({
      get: sectionRepository.getAnnotations,
      items: annotationRepository,
    });

    const allAnnotations = computed(() => {
      return annotationDataStore.data.value;
    });
    const annotations = computed(() => {
      return allAnnotations.value;
    });

    annotationDataStore.setId(params.sectionId as string);
    watch(
      () => params.sectionId,
      (newId, oldId) => {
        annotationDataStore.setId(params.sectionId);
      },
    );

    const deleteAnnotation = async (annotation: W3CAnnotation) => {
      ModalService.showConfirm({
        title: 'Delete link',
        message: `Are you sure to delete this annotation?`,
        onClose: (result) => {
          if (result.confirmed) {
            annotationDataStore.deleteItem(annotation.id);
          }
        },
      });
    };
    const saveOrCreateAnnotation = async (
      id: string | null,
      annotation: AnnotationType,
    ) => {
      if (!id || AnnotationTester({ id }).isNew()) {
        return annotationDataStore.createItem(annotation);
      }

      return annotationDataStore.patchItem(id, annotation);
    };

    return { annotations, deleteAnnotation, saveOrCreateAnnotation };
  })();
