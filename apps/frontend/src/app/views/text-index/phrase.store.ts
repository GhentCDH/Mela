import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useTableStore } from '@ghentcdh/ui';

export const usePhraseStore = defineStore('phraseStore', () => {
  const route = useRoute();
  const router = useRouter();

  const phrase_store_id = 'text-index-phrase';
  const tableStore = useTableStore(phrase_store_id);
  const textId = ref(route.params.textId);
  const phraseId = ref(route.params.phraseId);

  watch(
    () => route.params.textId,
    (newId, oldId) => {
      if (oldId !== newId) changeId(newId);
    },
  );
  watch(
    () => route.params.phraseId,
    (newId, oldId) => {
      if (oldId !== newId) phraseId.value = newId;
    },
  );

  const changeId = (newId: string) => {
    textId.value = newId;
    return router.push({ params: { id: newId }, query: route.query });
  };

  const phrases = computedAsync(() => {
    return tableStore.data;
  });

  const reload = () => {
    tableStore.reload();
  };

  return { phrases, phrase_store_id, textId, reload };
});
