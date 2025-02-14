import { TextFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import { RequestSchema } from '@ghentcdh/json-forms/core';

export const usePhraseRepository = defineStore('phraseRepository', () => {
  const httpStore = useHttpStore();

  const getDataUri = (textId: string) => {
    return `${TextFormSchema.schema.uri}/${textId}/phrase`;
  };

  const getPhraseText = (textId: string) => {
    return httpStore.get(getDataUri(textId), {
      queryParams: RequestSchema.parse({
        pageSize: 10000,
        sort: 'phrase_id',
      }),
    });
  };

  return { getDataUri, getPhraseText };
});
