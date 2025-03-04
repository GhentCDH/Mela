import { AnnotationFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { useHttpRequest } from '@ghentcdh/authentication-vue';

export const useAnnotationRepository = defineStore(
  'annotationRepository',
  () => {
    const httpRequest = useHttpRequest();

    const getDataUri = (...suffix: string[]) => {
      return [AnnotationFormSchema.schema.uri, ...suffix].join('/');
    };

    const deleteAnnotation = (annotationId: string) => {
      return httpRequest.delete(getDataUri(annotationId));
    };

    const patchAnnotation = (
      annotationId: string,
      annotation: W3CAnnotation,
    ) => {
      return httpRequest.patch(getDataUri(annotationId), annotation);
    };

    const patchAnnotations = (annotations: W3CAnnotation[]) => {
      return Promise.all(
        annotations.map((annotation) =>
          patchAnnotation(annotation.id, annotation),
        ),
      );
    };

    return { getDataUri, patchAnnotation, patchAnnotations, deleteAnnotation };
  },
);
