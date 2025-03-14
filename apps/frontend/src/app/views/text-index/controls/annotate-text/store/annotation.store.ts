import type {
  AnnotationMetadataType,
  AnnotationType,
  TextContentDto,
} from '@mela/text/shared';
import { getAnnotationUri } from '@mela/text/shared';
import { pick } from 'lodash-es';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type {
  SourceModel,
  TextAnnotation,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';
import { createTextSelectionAnnotation } from '@ghentcdh/annotations/core';

import { AnnotationService } from './annotation.service';
import type { AnnotationFilter } from '../utils/annotations.utils';
import { AnnotationUtils } from '../utils/annotations.utils';
import {
  PREFIX_GENERATED,
  generateW3CAnnotationBlocks,
} from '../utils/generate-blocks';
import { mapRelationsToLinks } from '../utils/links';
import { SourceUtils, createSourceFromTextContent } from '../utils/source';
import { AnnotationTester } from '../utils/tester';
import { w3cAnnotationsToAnnotationSelectors } from '../utils/w3c-to-annotationtype';

type SelectedIds = { textContentUri: string; annotationId: string };

export const useAnnotationStore = (id: string) =>
  defineStore(`annotation_store_${id}`, () => {
    const filter = ref<AnnotationFilter>({
      annotationType: [],
    });

    // This filter is used for selection depending on an action made in the frontend. f.e. adding an example can only be an example annotation
    const selectionFilter = ref<Partial<AnnotationFilter>>();

    const annotationService = new AnnotationService();

    const textId = ref<string>(null);
    const sources = ref<SourceModel[]>([]);

    const selectedIds = ref<SelectedIds | null>(null);
    const activeAnnotation = computed(() =>
      AnnotationUtils(annotationService.annotations.value).byId(
        selectedIds.value?.annotationId,
      ),
    );
    const activeTextContent = computed(() =>
      SourceUtils(sources.value).getSourceByUri(
        selectedIds.value.textContentUri,
      ),
    );

    const activeAnnotationLinks = computed(() => {
      const annotationId = selectedIds.value?.annotationId;
      if (!annotationId) return [];

      const sourceUri = getAnnotationUri({ id: annotationId });

      return mapRelationsToLinks(
        sourceUri,
        annotationService.annotations.value,
      );
    });

    const newAnnotations = ref<W3CAnnotation[]>([]);
    const annotations = computed(() =>
      [annotationService.annotations.value, newAnnotations].flat(),
    );

    const filteredAnnotations = computed(() =>
      AnnotationUtils(annotations.value).filter({
        ...filter.value,
        ...selectionFilter.value,
      }),
    );

    const init = (_sources: TextContentDto[], _textId: string) => {
      textId.value = _textId;
      sources.value = createSourceFromTextContent(_sources);
      annotationService.load(_textId);
      newAnnotations.value = [];
    };

    const createAnnotation = (
      sourceUri: string,
      annotation: TextAnnotation,
      type: AnnotationMetadataType,
    ) => {
      const source = SourceUtils(sources.value).getSourceByUri(sourceUri);
      const newAnnotation = createTextSelectionAnnotation(
        source,
        pick(annotation, ['start', 'end']),
        type,
      );

      newAnnotations.value = [...newAnnotations.value, newAnnotation];

      selectAnnotation({
        textContentUri: sourceUri,
        annotationId: newAnnotation.id,
      });

      return newAnnotation;
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

    const autoGenerateBlocks = (sourceId: string) => {
      newAnnotations.value = generateW3CAnnotationBlocks(
        SourceUtils(sources.value).getSource(sourceId),
        annotationService.annotations.value,
      );
    };
    const cancelAnnotations = (prefix: string) => {
      newAnnotations.value = [];
    };

    const saveGeneratedBlocks = () =>
      annotationService.createMulti(
        w3cAnnotationsToAnnotationSelectors(newAnnotations.value),
      );

    const resetSelection = () => {
      selectedIds.value = null;
    };

    const saveOrCreateAnnotation = async (
      id: string | null,
      annotation: AnnotationType,
    ) => {
      if (!id || AnnotationTester({ id }).isNew()) {
        return annotationService.create(annotation);
      }
      return annotationService.patch(id, annotation);
    };

    const deleteAnnotation = async (annotationId: string) => {
      if (AnnotationTester({ id: annotationId }).isNew()) {
        return;
      }

      await annotationService.delete(annotationId);
    };

    const changeFilter = (_filter: AnnotationFilter) => {
      filter.value = _filter;
    };

    const changeSelectionFilter = (_filter: Partial<AnnotationFilter>) => {
      selectionFilter.value = _filter;
    };

    return {
      loading: annotationService.loading,
      sources,
      annotations: filteredAnnotations,

      init,
      saveOrCreateAnnotation,
      deleteAnnotation,

      createAnnotation,
      selectAnnotation,
      autoGenerateBlocks,
      saveGeneratedBlocks,
      cancelGeneratedBLocks: () => cancelAnnotations(PREFIX_GENERATED),

      getAnnotation: (id: string) =>
        AnnotationUtils(annotations.value).byId(id),

      activeAnnotation,
      activeTextContent,
      activeAnnotationLinks,

      changeFilter,
      changeSelectionFilter,
      filter,
    };
  })();
