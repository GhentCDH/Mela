import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { Annotation } from '@ghentcdh/vue-component-annotated-text';

import type { AnnotationPage } from './annotation.collection';
import type {
  MelaAnnotation,
  TranslatedAnnotation} from './mela_annotation';
import {
  TranslatedAnnotationInstance,
} from './mela_annotation';
import { parseAnnotation } from './parse';
import type { AnnotationMetadataType } from './types';
import { splitTextInLines } from './utils/lines';

const filterAnnotations = (
  annotations: TranslatedAnnotation[],
  mapper: (d: TranslatedAnnotation) => MelaAnnotation | null,
): MelaAnnotation[] => {
  return annotations.map(mapper).filter((a) => !!a);
};

export const useAnnotationStore = (id: string) =>
  defineStore(`annotation_store_${id}`, () => {
    const sourceText = ref<string>('');
    const annotations = ref<TranslatedAnnotation[]>([]);
    const selectedAnnotation = ref<TranslatedAnnotation | null>(null);

    const sourceLines = computed(() => splitTextInLines(sourceText.value));
    const sourceAnnotations = computed(() =>
      filterAnnotations(annotations.value, (d) => d.source),
    );

    const translatedText = ref<string>('');
    const translatedLines = computed(() =>
      splitTextInLines(translatedText.value),
    );
    const translatedAnnotations = computed(() =>
      filterAnnotations(annotations.value, (d) => d.translation),
    );
    const selectedTranslationsAnnotations = computed(() =>
      selectedAnnotation?.value
        ? selectedAnnotation.value.translation
          ? [selectedAnnotation.value.translation]
          : []
        : translatedAnnotations.value,
    );

    const init = (
      _sourceText: string,
      _translatedText: string,
      annotationPage: AnnotationPage,
    ) => {
      sourceText.value = _sourceText;
      translatedText.value = _translatedText;
      // TODO check if all annotations are still valid!
      annotations.value = annotationPage.items.map((i) =>
        TranslatedAnnotationInstance.parse(i, _sourceText, _translatedText),
      );
    };

    const createAnnotation = (
      annotation: Annotation,
      type: AnnotationMetadataType,
    ) => {
      annotations.value = [
        ...annotations.value,
        TranslatedAnnotationInstance.parse(
          parseAnnotation(sourceText.value, annotation, type),
          sourceText.value,
          translatedText.value,
        ),
      ];
    };

    // Update the translation by selection
    const updateTranslation = (annotation: Annotation) => {
      const update = selectedAnnotation.value.translate(
        annotation.start,
        annotation.end,
      );
      annotations.value = annotations.value.map((a) =>
        a.id === update.id ? update : a,
      );
    };

    // Update the translation by selection
    const updateAnnotation = (annotation: Annotation, text: string) => {
      const update = selectedAnnotation.value.update(
        annotation.start,
        annotation.end,
      );
      annotations.value = annotations.value.map((a) =>
        a.id === update.id ? update : a,
      );
    };

    const selectAnnotation = (id: string | undefined | null) => {
      if (!id) {
        // TODO  showAllTranslations();
        selectedAnnotation.value = null;
        return;
      }
      selectedAnnotation.value = annotations.value.find((a) => a.id === id);

      return selectedAnnotation.value;
    };

    return {
      init,
      sourceLines,
      translatedLines,
      sourceAnnotations,
      translatedAnnotations,
      selectedTranslationsAnnotations,
      createAnnotation,
      updateAnnotation,
      updateTranslation,
      selectAnnotation,
      selectedAnnotation,
    };
  });
