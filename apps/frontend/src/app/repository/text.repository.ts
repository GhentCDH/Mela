import { TextFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import { RequestSchema } from '@ghentcdh/tools/form';
import { MelaAnnotationPage } from '@ghentcdh/mela/shared';

export const useTextRepository = defineStore('textRepository', () => {
  const httpStore = useHttpStore();

  const getDataUri = (textId: string, suffix: string) => {
    return `${TextFormSchema.schema.uri}/${textId}/${suffix}`;
  };

  const getAnnotations = (textId: string): Promise<MelaAnnotationPage> => {
    return httpStore.get(getDataUri(textId, 'annotation'), {
      queryParams: RequestSchema.parse({
        pageSize: 10000,
      }),
    });
  };

  return { getDataUri, getAnnotations };
});
