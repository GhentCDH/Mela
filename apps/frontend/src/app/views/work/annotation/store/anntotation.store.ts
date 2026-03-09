import { defineStore } from 'pinia';
import { useSectionRepository } from '../../../../repository/section.repository';
import { computed, ref, watch } from 'vue';
import { W3CAnnotation } from '@ghentcdh/annotated-text';
import { ModalService } from '@ghentcdh/ui';
import { useAnnotationRepository } from '../../../../repository/annotation.repository';
import { AnnotationDto } from '@mela/text/shared';
import { AnnotationTester } from '../../text-index/controls/annotate-text/utils/tester';
import { DataStore } from '../../../../repository/data.store';
import { useRouteParams } from '../../../../utils/useRouteParams';
import { findPurposeLowerCase } from '../../../../style/annotation.style';
import type { AnnotationType as AnnotationTypeLabel } from '../../text-index/controls/identify.color';
import { annotationUtils } from '../utils/annotation-utils';

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

    const selectedAnnotationTypes = ref<AnnotationTypeLabel[]>([]);

    const utils = computed(() => {
      return annotationUtils(allAnnotations.value);
    });

    const annotations = computed(() => {
      if (selectedAnnotationTypes.value.length === 0) {
        return allAnnotations.value;
      }
      return allAnnotations.value?.filter((annotation) => {
        const purpose = findPurposeLowerCase(annotation) as AnnotationTypeLabel;
        return selectedAnnotationTypes.value.includes(purpose);
      });
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
      annotation: AnnotationDto,
    ) => {
      if (!id || AnnotationTester({ id }).isNew()) {
        return annotationDataStore.createItem(annotation);
      }

      return annotationDataStore.patchItem(id, annotation);
    };

    return {
      annotations,
      selectedAnnotationTypes,
      utils,
      deleteAnnotation,
      saveOrCreateAnnotation,
    };
  })();
