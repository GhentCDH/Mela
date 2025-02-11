import type { MotivationEnumType } from '@mela/generated/types';
import type { W3CAnnotation } from '@mela/text/shared';
import { TextFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import type { MelaAnnotationPage } from '@ghentcdh/mela/shared';
import { RequestSchema } from '@ghentcdh/tools/form';


export const useTextRepository = defineStore('textRepository', () => {
  const httpStore = useHttpStore();

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
    return httpStore.get(getAnnotationUri(textId), {
      queryParams: RequestSchema.parse({
        pageSize: 10000,
        filter: `motivation:${motivation}:equals`,
      }),
    });
  };

  const createAnnotation = (textId: string, annotation: W3CAnnotation) => {
    return httpStore.post(getAnnotationUri(textId), annotation);
  };

  return { getDataUri, getAnnotations, createAnnotation };
});
