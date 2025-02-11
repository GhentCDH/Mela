import type { AnnotationMetadataType } from '@mela/text/shared';
import { computedAsync } from '@vueuse/core';
import { pick } from 'lodash-es';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { useNotificationStore } from '@ghentcdh/ui';
import type { Annotation } from '@ghentcdh/vue-component-annotated-text';

import { generateAnnotationBlocks } from './generate-blocks';
import { splitTextInLines } from './lines';
import type { MelaAnnotation, TranslatedAnnotation } from './mela_annotation';
import { TranslatedAnnotationInstance } from './mela_annotation';
import { parseAnnotation } from './parse';
import { ReloadRef } from './reload';
import { useAnnotationRepository } from '../../../../../repository/annotation.repository';
import { useTextRepository } from '../../../../../repository/text.repository';

const filterAnnotations = (
  annotations: TranslatedAnnotation[],
  mapper: (d: TranslatedAnnotation) => MelaAnnotation | null,
): MelaAnnotation[] => {
  return (annotations ?? []).map(mapper).filter((a) => !!a);
};

export const useAnnotationStore = (id: string) =>
  defineStore(`annotation_store_${id}`, () => {
    const reload = ReloadRef();
    const loading = ref(true);
    const notificationStore = useNotificationStore();
    const sourceText = ref<string>('');
    const textId = ref<string>(null);
    // const annotations = ref<TranslatedAnnotation[]>([]);
    const selectedAnnotation = ref<TranslatedAnnotation | null>(null);
    const textRepository = useTextRepository();
    const annotationRepository = useAnnotationRepository();

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

    const annotations = computedAsync(async () => {
      const id = textId.value;
      if (!id) return [];

      const r = reload.watchReload.value;

      const _sourceText = sourceText.value;
      const _translatedText = translatedText.value;
      const annotations = await textRepository.getAnnotations(
        id,
        'classifying',
      );

      const result = annotations.items.map((i) =>
        TranslatedAnnotationInstance.parse(i, _sourceText, _translatedText),
      );

      loading.value = false;
      return result;
    });

    const init = (
      _sourceText: string,
      _translatedText: string,
      _textId: string,
    ) => {
      sourceText.value = _sourceText;
      translatedText.value = _translatedText;
      textId.value = _textId;
    };

    const createAnnotation = (
      annotation: Annotation,
      type: AnnotationMetadataType,
    ) => {
      annotations.value = [
        ...annotations.value,
        TranslatedAnnotationInstance.parse(
          parseAnnotation(
            sourceText.value,
            pick(annotation, ['start', 'end']),
            type,
          ),
          sourceText.value,
          translatedText.value,
        ),
      ];
    };

    const createNewAnnotations = async () => {
      const newAnnotations = annotations.value.filter((a) => a.isNew);
      if (newAnnotations.length === 0) return;
      loading.value = true;
      await Promise.all(
        newAnnotations.map((a) =>
          textRepository.createAnnotation(textId.value, a.asW3CAnnotation()),
        ),
      )
        .then(() => {
          notificationStore.info('Annotations saved');
        })
        .catch(() => {
          notificationStore.error('Failed to save annotations');
        });

      reload.reload();
    };

    // Update the translation by selection
    const updateTranslation = (annotation: Annotation) => {
      const update = selectedAnnotation.value.translate(
        annotation.start,
        annotation.end,
      );
      updateAnnotationList(update);
    };

    const changeType = (annotationType: AnnotationMetadataType) => {
      if (!selectedAnnotation.value) {
        return;
      }

      const update = selectedAnnotation.value.changeType(annotationType);
      updateAnnotationList(update);
    };
    // Update the translation by selection
    const updateAnnotation = (annotation: Annotation, text: string) => {
      const update = selectedAnnotation.value.update(
        annotation.start,
        annotation.end,
      );
      updateAnnotationList(update);
    };

    const updateAnnotationList = (annotation: TranslatedAnnotation) => {
      annotations.value = annotations.value.map((a) =>
        a.id === annotation.id ? annotation : a,
      );
    };

    const selectAnnotation = (id: string | undefined | null) => {
      resetSelection();
      if (!id) {
        // TODO  showAllTranslations();
        selectedAnnotation.value = null;
        return;
      }
      selectedAnnotation.value = annotations.value.find((a) => a.id === id);

      return selectedAnnotation.value;
    };

    const autoGenerateBlocks = () => {
      annotations.value = generateAnnotationBlocks(
        sourceText.value,
        translatedText.value,
        annotations.value,
      );
    };

    const deleteActiveAnnotation = async () => {
      const annotation = selectedAnnotation.value;
      if (!annotation) return;

      loading.value = true;
      await annotationRepository
        .deleteAnnotation(selectedAnnotation.value.id)
        .then(() => {
          notificationStore.info('Annotation deleted');
        })
        .catch(() => {
          notificationStore.error('Failed to delete annotation');
        });
      reload.reload();
      resetSelection();
    };

    const saveActiveAnnotation = async () => {
      const annotation = selectedAnnotation.value;
      if (!annotation) return;

      await annotationRepository
        .patchAnnotation(annotation.id, annotation.asW3CAnnotation())
        .then(() => {
          notificationStore.info('Annotation saved');
          reload.reload();
          resetSelection();
        })
        .catch(() => {
          notificationStore.error('Failed to save annotation');
        });
    };

    const resetSelection = () => {
      selectedAnnotation.value = null;
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
      autoGenerateBlocks,
      createNewAnnotations,
      deleteActiveAnnotation,
      saveActiveAnnotation,
      changeType,
    };
  });
