import type { AnnotationMetadataType, TextContentDto } from '@mela/text/shared';
import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { TextAnnotation, W3CAnnotation } from '@ghentcdh/annotations/core';
import { useNotificationStore } from '@ghentcdh/ui';

import { PREFIX_GENERATED } from './generate-blocks';
import { ReloadRef } from './reload';
import { TextWithAnnotations } from './text';
import { useAnnotationRepository } from '../../../../../repository/annotation.repository';
import { useTextRepository } from '../../../../../repository/text.repository';
import { AnnotationTester } from './tester';

export const useAnnotationStore = (id: string) =>
  defineStore(`annotation_store_${id}`, () => {
    let textWithAnnotations: TextWithAnnotations;
    const textWithAnnotationsRef = ref<TextWithAnnotations>();

    const sources = computed(() => textWithAnnotationsRef.value?.sources);

    const reload = ReloadRef();
    const loading = ref(true);
    const notificationStore = useNotificationStore();
    const textId = ref<string>(null);
    // const annotations = ref<TranslatedAnnotation[]>([]);
    const selectedAnnotationId = ref<string | null>(null);
    const textRepository = useTextRepository();
    const annotationRepository = useAnnotationRepository();

    const w3cAnnotations = ref<W3CAnnotation[]>([]);
    const _annotations = computedAsync(async () => {
      const id = textId.value;
      if (!id) return [];

      const r = reload.watchReload.value;
      const annotations = await textRepository.getAnnotations(
        id,
        'classifying',
      );

      w3cAnnotations.value = annotations.items;
      textWithAnnotations.setAnnotations(annotations.items);

      loading.value = false;
      return annotations.items;
    });

    const sourceTextContent = ref<TextContentDto>();
    const transtlationTextContent = ref<TextContentDto>();

    const init = (
      _sourceText: TextContentDto,
      _translatedText: TextContentDto,
      _textId: string,
    ) => {
      textWithAnnotations = new TextWithAnnotations([
        _sourceText,
        _translatedText,
      ]);
      textWithAnnotationsRef.value = textWithAnnotations;
      sourceTextContent.value = _sourceText;
      transtlationTextContent.value = _translatedText;
      textId.value = _textId;
    };

    const createAnnotation = (
      sourceId: string,
      annotation: TextAnnotation,
      type: AnnotationMetadataType,
    ) => {
      const newAnnotation = textWithAnnotations.createAnnotation(
        sourceId,
        annotation,
        type,
      );

      reloadFromTextWithAnnotations();
      selectAnnotation(newAnnotation.id);

      return newAnnotation;
    };

    const createAnnotations = async (newAnnotations: W3CAnnotation[]) => {
      if (newAnnotations.length === 0) return;

      loading.value = true;
      await textRepository
        .createAnnotations(textId.value, newAnnotations)
        .then(() => {
          notificationStore.info('Annotations saved');
        })
        .catch(() => {
          notificationStore.error('Failed to save annotations');
        });

      reload.reload();
    };

    const saveAnnotations = async (annotations: W3CAnnotation[]) => {
      if (annotations.length === 0) return;

      loading.value = true;
      await annotationRepository
        .patchAnnotations(annotations)
        .then(() => {
          notificationStore.info('Annotations saved');
        })
        .catch(() => {
          notificationStore.error('Failed to save annotations');
        });

      reload.reload();
    };

    const selectAnnotation = (id: string | undefined | null) => {
      resetSelection();
      if (!id) {
        // TODO  showAllTranslations();
        selectedAnnotationId.value = null;
        return null;
      }

      const annotation = w3cAnnotations.value.find((a) => a.id === id);

      selectedAnnotationId.value = id;
      return selectedAnnotationId;
    };

    const autoGenerateBlocks = (sourceId: string) => {
      w3cAnnotations.value =
        textWithAnnotations.autoGenerateAnnotations(sourceId);
    };
    const cancelAnnotations = (prefix: string) => {
      w3cAnnotations.value = textWithAnnotations.cancelAnnotations(prefix);
    };

    const resetSelection = () => {
      selectedAnnotationId.value = null;
    };

    const saveOrCreateAnnotation = async (annotation: W3CAnnotation) => {
      if (AnnotationTester(annotation).isNew()) {
        return createAnnotations([annotation]);
      }

      return saveAnnotations([annotation]);
    };

    const deleteAnnotation = async (annotationId: string) => {
      if (AnnotationTester({ id: annotationId }).isNew()) {
        textWithAnnotations.cancelAnnotations(annotationId);
        return;
      }

      loading.value = true;
      await annotationRepository
        .deleteAnnotation(selectedAnnotation.value.getId())
        .then(() => {
          notificationStore.info('Annotation deleted');
        })
        .catch(() => {
          notificationStore.error('Failed to delete annotation');
        });

      reload.reload();
      resetSelection();
    };

    const reloadFromTextWithAnnotations = () => {
      w3cAnnotations.value = textWithAnnotations.getAnnotations();
    };

    return {
      sources,
      selectedAnnotationId,
      textWithAnnotations: textWithAnnotationsRef,
      annotations: w3cAnnotations,

      init,
      saveOrCreateAnnotation,
      deleteAnnotation,
      reloadFromTextWithAnnotations,

      createAnnotation,
      selectAnnotation,
      autoGenerateBlocks,
      saveGeneratedBlocks: () =>
        createAnnotations(
          textWithAnnotations.getAnnotationsByPrefix(PREFIX_GENERATED),
        ),
      cancelGeneratedBLocks: () => cancelAnnotations(PREFIX_GENERATED),
    };
  });
