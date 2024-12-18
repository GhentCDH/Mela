import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import { TextWithRelations } from '@ghentcdh/mela/generated/types';

export const usePhraseStore = defineStore('phraseStore', () => {
  const route = useRoute();
  const router = useRouter();

  console.log(route.params);

  const textId = ref(route.params.textId);

  watch(
    () => route.params.textId,
    (newId, oldId) => {
      if (oldId !== newId) changeId(newId);
    }
  );

  const changeId = (newId: string) => {
    textId.value = newId;
    return router.push({ params: { id: newId }, query: route.query });
  };

  const httpStore = useHttpStore();

  const text = computedAsync(() => {
    console.log('change text id', textId.value);
    if (!textId.value) return null;

    return httpStore.get<TextWithRelations>(`/api/text/${textId.value}`);
  });

  return { text, textId };
});
