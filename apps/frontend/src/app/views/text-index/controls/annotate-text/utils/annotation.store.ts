import type {
  AnnotationMetadataType,
  ExampleDto,
  TextContentDto,
} from '@mela/text/shared';
import { getAnnotationIdFromUri, getAnnotationUri } from '@mela/text/shared';
import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { TextAnnotation, W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  findAnnotations,
  findRelatedAnnotation,
} from '@ghentcdh/annotations/core';
import { useNotificationStore } from '@ghentcdh/ui';

import { PREFIX_GENERATED } from './generate-blocks';
import { ReloadRef } from './reload';
import { AnnotationTester } from './tester';
import { TextWithAnnotations } from './text';
import { useAnnotationRepository } from '../../../../../repository/annotation.repository';
import { useExampleRepository } from '../../../../../repository/example.repository';
import { useTextRepository } from '../../../../../repository/text.repository';

type SelectedIds = { textContentId: string; annotationId: string };

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
    const selectedIds = ref<SelectedIds | null>(null);
    const textRepository = useTextRepository();
    const exampleRepository = useExampleRepository();
    const annotationRepository = useAnnotationRepository();
    const activeAnnotation = computed(() =>
      selectedIds.value?.annotationId
        ? textWithAnnotationsRef.value.getAnnotation(
            selectedIds.value?.annotationId,
          )
        : null,
    );
    const activeTextContent = computed(() =>
      selectedIds.value?.textContentId
        ? textWithAnnotationsRef.value.getSourceByUri(
            selectedIds.value?.textContentId,
          )
        : null,
    );
    const activeAnnotationLinks = computed(() => {
      const annotationId = selectedIds.value?.annotationId;
      if (!annotationId) return [];

      const sourceUri = getAnnotationUri({ id: annotationId });

      const annotations = w3cAnnotations.value;
      return findAnnotations(w3cAnnotations.value)
        .findInTargetSource(sourceUri)
        .map((link) => ({
          annotation: link,
          relations: findRelatedAnnotation(
            annotations,
            getAnnotationIdFromUri,
          )(link),
        }));
    });

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

    const init = (sources: TextContentDto[], _textId: string) => {
      textWithAnnotations = new TextWithAnnotations(sources);
      textWithAnnotationsRef.value = textWithAnnotations;
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
      selectAnnotation({
        textContentId: sourceId,
        annotationId: newAnnotation.id,
      });

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
        .patchMulti(annotations)
        .then(() => {
          notificationStore.info('Annotations saved');
        })
        .catch(() => {
          notificationStore.error('Failed to save annotations');
        });

      reload.reload();
    };

    const selectAnnotation = (ids: {
      annotationId: string | undefined | null;
      textContentId: string | undefined | null;
    }) => {
      resetSelection();
      if (!ids || !ids.textContentId || !ids.annotationId) {
        // TODO  showAllTranslations();
        selectedIds.value = null;
        return null;
      }

      selectedIds.value = ids;
      return ids;
    };

    const autoGenerateBlocks = (sourceId: string) => {
      w3cAnnotations.value =
        textWithAnnotations.autoGenerateAnnotations(sourceId);
    };
    const cancelAnnotations = (prefix: string) => {
      w3cAnnotations.value = textWithAnnotations.cancelAnnotations(prefix);
    };

    const resetSelection = () => {
      selectedIds.value = null;
    };

    const saveOrCreateAnnotation = async (annotation: W3CAnnotation) => {
      if (!annotation.id || AnnotationTester(annotation).isNew()) {
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
      await annotationRepository.delete(annotationId);

      reload.reload();

      if (annotationId == selectedIds.value?.annotationId) resetSelection();
    };

    const reloadFromTextWithAnnotations = () => {
      w3cAnnotations.value = textWithAnnotations.getAnnotations();
    };

    const saveExample = async (example: ExampleDto & { id?: string }) => {
      const promise = example.id
        ? exampleRepository.patch(example.id, example)
        : exampleRepository.create(example);

      await promise;

      reload.reload();
    };

    return {
      sources,
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
      saveExample,
      activeAnnotation,
      activeTextContent,
      activeAnnotationLinks,
    };
  })();
