import type { MotivationEnumType } from '@mela/generated/types';
import { TextFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { RequestSchema } from '@ghentcdh/json-forms/core';
import type { MelaAnnotationPage } from '@ghentcdh/mela/shared';

export const useTextRepository = defineStore('textRepository', () => {
  const httpRequest = useHttpRequest();

  const getDataUri = (textId: string, ...suffix: string[]) => {
    return [TextFormSchema.schema.uri, textId, ...suffix].join('/');
  };
  const getAnnotationUri = (textId: string, suffix = '') => {
    return getDataUri(textId, 'annotation', ...suffix);
  };

  const getAnnotations = (
    textId: string,
    motivation: MotivationEnumType,
  ): Promise<MelaAnnotationPage> => {
    return httpRequest.get(getAnnotationUri(textId), {
      queryParams: RequestSchema.parse({
        pageSize: 10000,
        // filter: `motivation:${motivation}:equals`,
      }),
    });
  };

  const createAnnotation = (textId: string, annotation: W3CAnnotation) => {
    annotation.id = null;
    return httpRequest.post(getAnnotationUri(textId), annotation);
  };

  const createAnnotations = (textId: string, annotations: W3CAnnotation[]) => {
    return Promise.all(annotations.map((a) => createAnnotation(textId, a)));
  };

  return { getDataUri, getAnnotations };
});
