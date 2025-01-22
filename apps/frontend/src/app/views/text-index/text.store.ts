import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import type { TextWithRelations } from '@ghentcdh/mela/generated/types';

export const useTextStore = defineStore('textStore', () => {
  const route = useRoute();
  const router = useRouter();

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

  const httpStore = useHttpStore();

  const text = computedAsync(() => {
    if (!textId.value) return null;

    return httpStore.get<TextWithRelations>(`/api/text/${textId.value}`);
  });

  const uploadExcel = (file: File) => {
    return httpStore.postFile<TextWithRelations>(
      `/api/text/${textId.value}/upload`,
      file,
    );
  };

  return { text, textId, uploadExcel };
});
