import type { AnnotationMetadataType } from '@mela/text/shared';
import { computedAsync } from '@vueuse/core';
import { pick } from 'lodash-es';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { TextAnnotation, W3CAnnotation } from '@ghentcdh/annotations/core';
import type { TextContent } from '@ghentcdh/mela/generated/types';
import { useNotificationStore } from '@ghentcdh/ui';

import {
  generateW3CAnnotationBlocks,
  PREFIX_GENERATED,
} from './generate-blocks';
import type { MelaAnnotation, TranslatedAnnotation } from './mela_annotation';
import type { EditableAnnotation } from './parse';
import { editableAnnotation, parseAnnotation } from './parse';
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
    const textId = ref<string>(null);
    // const annotations = ref<TranslatedAnnotation[]>([]);
    const selectedAnnotation = ref<EditableAnnotation | null>(null);
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

      loading.value = false;
      return annotations.items;
    });

    const sourceTextContent = ref<TextContent>();
    const transtlationTextContent = ref<TextContent>();

    const init = (
      _sourceText: TextContent,
      _translatedText: TextContent,
      _textId: string,
    ) => {
      sourceTextContent.value = _sourceText;
      transtlationTextContent.value = _translatedText;
      textId.value = _textId;
    };

    const createAnnotation = (
      annotation: TextAnnotation,
      type: AnnotationMetadataType,
    ) => {
      const newAnnotation = parseAnnotation(
        sourceTextContent.value,
        pick(annotation, ['start', 'end']),
        type,
      );

      w3cAnnotations.value = [...w3cAnnotations.value, newAnnotation];

      selectAnnotation(newAnnotation.id);

      return newAnnotation;
    };

    const cancelGeneratedBLocks = () => {
      w3cAnnotations.value = w3cAnnotations.value.filter(
        (a) => !a.id.startsWith(PREFIX_GENERATED),
      );
    };

    const saveGeneratedBlocks = async () => {
      const newAnnotations = w3cAnnotations.value.filter((a) =>
        a.id.startsWith(PREFIX_GENERATED),
      );
      if (newAnnotations.length === 0) return;

      loading.value = true;
      await Promise.all(
        newAnnotations.map((a) =>
          textRepository.createAnnotation(textId.value, a),
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
    const updateTranslation = (annotation: TextAnnotation) => {
      const update = selectedAnnotation.value.updateTranslation(annotation);
      updateAnnotationList(update);
    };

    const changeType = (annotationType: AnnotationMetadataType) => {
      if (!selectedAnnotation.value) {
        return;
      }

      const update = selectedAnnotation.value.updatePurpose(annotationType);

      updateAnnotationList(update);
    };
    // Update the translation by selection
    const updateAnnotation = (annotation: TextAnnotation, text: string) => {
      const update = selectedAnnotation.value.updateSource(annotation);
      updateAnnotationList(update);
    };

    const updateAnnotationList = (annotation: W3CAnnotation) => {
      w3cAnnotations.value = w3cAnnotations.value.map((a) =>
        a.id === annotation.id ? annotation : a,
      );
    };

    const selectAnnotation = (id: string | undefined | null) => {
      resetSelection();
      if (!id) {
        // TODO  showAllTranslations();
        selectedAnnotation.value = null;
        return null;
      }

      const annotation = w3cAnnotations.value.find((a) => a.id === id);
      selectedAnnotation.value = editableAnnotation(
        annotation,
        sourceTextContent.value,
        transtlationTextContent.value,
      );
      return selectedAnnotation.value;
    };

    const autoGenerateBlocks = () => {
      w3cAnnotations.value = generateW3CAnnotationBlocks(
        sourceTextContent.value,
        w3cAnnotations.value,
      );
    };

    const deleteActiveAnnotation = async () => {
      const annotation = selectedAnnotation.value;
      if (!annotation) return;

      if (annotation.getId().startsWith) loading.value = true;
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

    const createActiveAnnotation = async () => {
      const annotation = selectedAnnotation.value;
      if (!annotation) return;

      await textRepository
        .createAnnotation(textId.value, annotation.getAnnotation())
        .then(() => {
          notificationStore.info('Annotation created');
          reload.reload();
          resetSelection();
        })
        .catch(() => {
          notificationStore.error('Failed to create annotation');
        });
    };

    const saveActiveAnnotation = async () => {
      const annotation = selectedAnnotation.value;
      if (!annotation) return;

      await annotationRepository
        .patchAnnotation(annotation.getId(), annotation.getAnnotation())
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

    const undoChanges = () => {
      if (!selectedAnnotation.value) return;

      if (selectedAnnotation.value.isNew()) {
        w3cAnnotations.value = w3cAnnotations.value.filter(
          (a) => a.id !== selectedAnnotation.value.getId(),
        );
      } else {
        w3cAnnotations.value = w3cAnnotations.value.map((a) =>
          a.id == selectedAnnotation.value.getId()
            ? selectedAnnotation.value.undoChanges()
            : a,
        );
      }
      selectAnnotation(null);
    };

    return {
      init,
      annotations: w3cAnnotations,
      createAnnotation,
      updateAnnotation,
      updateTranslation,
      selectAnnotation,
      selectedAnnotation,
      autoGenerateBlocks,
      saveGeneratedBlocks,
      cancelGeneratedBLocks,
      createActiveAnnotation,
      deleteActiveAnnotation,
      saveActiveAnnotation,
      changeType,
      undoChanges,
    };
  });
