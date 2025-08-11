import type {
  AnnotationMetadataType,
  AnnotationType,
  TextContentDto,
} from '@mela/text/shared';
import { pick } from 'lodash-es';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type {
  SourceModel,
  TextAnnotation,
  W3CAnnotation,
} from '@ghentcdh/vue-component-annotated-text';
import { createTextSelectionAnnotation } from '@ghentcdh/vue-component-annotated-text';

import { AnnotationService } from './annotation.service';
import type { AnnotationFilter } from '../utils/annotations.utils';
import { AnnotationUtils } from '../utils/annotations.utils';
import { generateW3CAnnotationBlocks } from '../utils/generate-blocks';
import { SourceUtils, createSourceFromTextContent } from '../utils/source';
import { AnnotationTester } from '../utils/tester';
import { w3cAnnotationsToAnnotationSelectors } from '../utils/w3c-to-annotationtype';

export const useAnnotationStore = (id: string) =>
  defineStore(`annotation_store_${id}`, () => {
    const filter = ref<AnnotationFilter>({
      annotationType: [],
      annotationId: undefined,
    });

    // This filter is used for selection depending on an action made in the frontend. f.e. adding an example can only be an example annotation
    const selectionFilter = ref<Partial<AnnotationFilter>>();

    const annotationService = new AnnotationService();

    const textId = ref<string>(null);
    const sources = ref<SourceModel[]>([]);

    const newAnnotations = ref<W3CAnnotation[]>([]);
    const annotations = computed(() =>
      [annotationService.annotations.value, newAnnotations.value].flat(),
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

      newAnnotations.value = [newAnnotation];

      return newAnnotation;
    };

    const autoGenerateBlocks = (sourceId: string) => {
      const generatedBlocks = generateW3CAnnotationBlocks(
        SourceUtils(sources.value).getSource(sourceId),
        annotations.value,
      );
      newAnnotations.value = [newAnnotations.value, generatedBlocks].flat();
    };
    const cancelNewAnnotations = () => {
      newAnnotations.value = [];
    };

    const saveGeneratedBlocks = () =>
      annotationService.createMulti(
        w3cAnnotationsToAnnotationSelectors(newAnnotations.value),
      );

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
        newAnnotations.value = newAnnotations.value.filter(
          (a) => a.id !== annotationId,
        );
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
      allAnnotations: annotations,

      init,
      saveOrCreateAnnotation,
      deleteAnnotation,

      createAnnotation,
      autoGenerateBlocks,
      saveGeneratedBlocks,

      getAnnotation: (id: string) =>
        AnnotationUtils(annotations.value).byId(id),

      changeFilter,
      changeSelectionFilter,
      cancelNewAnnotations,
      filter,
    };
  })();
