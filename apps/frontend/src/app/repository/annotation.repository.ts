import { AnnotationFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { useHttpStore } from '@ghentcdh/authentication/frontend';

export const useAnnotationRepository = defineStore(
  'annotationRepository',
  () => {
    const httpStore = useHttpStore();

    const getDataUri = (...suffix: string[]) => {
      return [AnnotationFormSchema.schema.uri, ...suffix].join('/');
    };

    const deleteAnnotation = (annotationId: string) => {
      return httpStore.delete(getDataUri(annotationId));
    };

    const patchAnnotation = (
      annotationId: string,
      annotation: W3CAnnotation,
    ) => {
      return httpStore.patch(getDataUri(annotationId), annotation);
    };

    return { getDataUri, patchAnnotation, deleteAnnotation };
  },
);
