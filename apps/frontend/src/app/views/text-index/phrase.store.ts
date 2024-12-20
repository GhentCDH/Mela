import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import { Phrase, TextWithRelations } from '@ghentcdh/mela/generated/types';
import { useFormStore, useTableStore } from '@ghentcdh/ui';

export const usePhraseStore = defineStore('phraseStore', () => {
  const route = useRoute();
  const router = useRouter();

  const phrase_store_id = 'text-index-phrase';
  const formStore = useFormStore(phrase_store_id);
  const tableStore = useTableStore(phrase_store_id);
  const textId = ref(route.params.textId);
  const phraseId = ref(route.params.phraseId);

  watch(
    () => route.params.textId,
    (newId, oldId) => {
      if (oldId !== newId) changeId(newId);
    }
  );
  watch(
    () => route.params.phraseId,
    (newId, oldId) => {
      if (oldId !== newId) phraseId.value = newId;
    }
  );

  const changeId = (newId: string) => {
    textId.value = newId;
    return router.push({ params: { id: newId }, query: route.query });
  };

  const httpStore = useHttpStore();

  const text = computedAsync(() => {
    if (!textId.value) return null;

    return httpStore.get<TextWithRelations>(`/api/text/${textId.value}`);
  });

  const phrase = computedAsync(() => {
    if (!phraseId.value) return { text_id: textId.value } as Phrase;

    return httpStore.get<Phrase>(`/api/phrase/${phraseId.value}`);
  });

  const reload = () => {
    tableStore.reload();
  };

  return { text, textId, phrase, phrase_store_id, reload };
});
