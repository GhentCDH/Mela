import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useHttpStore } from '@ghentcdh/authentication-vue';
import type {
  TextContentWithRelations,
  TextWithRelations,
} from '@ghentcdh/mela/generated/types';

export const useTextStore = defineStore('textStore', () => {
  const route = useRoute();
  const router = useRouter();

  const textId = ref(route.params.textId as string);
  const phraseId = ref(route.params.phraseId);

  watch(
    () => route.params.textId,
    (newId, oldId) => {
      if (oldId !== newId) changeId(newId as string);
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

    if (textId.value === 'new')
      return Promise.resolve({
        name: '',
        textContent: [
          {
            language: 'Greek',
            content: '',
            text_type: 'SOURCE',
          },
          {
            language: 'English',
            content: '',
            text_type: 'TRANSLATION',
          },
        ],
      } as unknown as Partial<TextWithRelations>);

    return httpStore
      .get<Partial<TextWithRelations>>(`/api/text/${textId.value}`)
      .then((text) => {
        const textContent = [
          text.textContent?.find((t) => t.text_type === 'SOURCE') ??
            ({
              language: 'Greek',
              content: '',
              text_type: 'SOURCE',
            } as TextContentWithRelations),
          text.textContent?.find((t) => t.text_type === 'TRANSLATION') ??
            ({
              language: 'English',
              content: '',
              text_type: 'TRANSLATION',
            } as TextContentWithRelations),
        ];
        return { ...text, textContent };
      });
  });

  const saveOrUpdate = (text: Partial<TextWithRelations>) => {
    if (textId.value === 'new') {
      return httpStore
        .post<TextWithRelations>('/api/text', text)
        .then((text) => {
          changeId(text.id);
          return text;
        });
    } else {
      return httpStore.patch<TextWithRelations>(
        `/api/text/${textId.value}`,
        text,
      );
    }
  };

  const uploadExcel = (file: File) => {
    return httpStore.postFile<TextWithRelations>(
      `/api/text/${textId.value}/upload`,
      file,
    );
  };

  return { text, textId, uploadExcel, saveOrUpdate };
});
