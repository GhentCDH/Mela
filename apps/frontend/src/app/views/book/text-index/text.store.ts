import type { TextContentDto } from '@mela/text/shared';
import { defineStore } from 'pinia';
import { computed, effect, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
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
  const httpRequest = useHttpRequest();

  const defaultSource = {
    language: 'gr',
    content: '',
    text_type: 'SOURCE',
  };

  const defaultTranslation = {
    language: 'en',
    content: '',
    text_type: 'TRANSLATION',
  };

  const text = ref<TextWithRelations | null>(null);

  const getText = () => {
    if (!textId.value) return null;

    if (textId.value === 'new')
      return Promise.resolve({
        name: '',
        textContent: [{ ...defaultSource }, { ...defaultTranslation }],
      } as unknown as Partial<TextWithRelations>);

    return httpRequest
      .get<Partial<TextWithRelations>>(`/api/text/${textId.value}`)
      .then((text) => {
        const textContent = [
          text.textContent?.find((t) => t.text_type === 'SOURCE') ??
            ({ ...defaultSource } as TextContentWithRelations),
          text.textContent?.find((t) => t.text_type === 'TRANSLATION') ??
            ({
              ...defaultTranslation,
            } as TextContentWithRelations),
        ];
        return { ...text, textContent };
      });
  };
  effect(() => {
    const _textId = textId.value;
    text.value = null;

    getText()?.then((_text: TextWithRelations) => {
      if (!_textId || !_text) return;
      if (_text.id !== textId.value) return;

      text.value = _text;
    });
  });

  const saveOrUpdate = (text: Partial<TextWithRelations>) => {
    if (textId.value === 'new') {
      return httpRequest
        .post<TextWithRelations>('/api/text', text)
        .then((text) => {
          changeId(text.id);
          return text;
        });
    } else {
      return httpRequest.patch<TextWithRelations>(
        `/api/text/${textId.value}`,
        text,
      );
    }
  };

  const sources = computed(() => {
    const textContent = text.value?.textContent ?? [];

    const textSource = [
      textContent.find((t) => t.text_type === 'SOURCE') ??
        ({
          ...defaultSource,
        } as TextContentDto),
      textContent.find((t) => t.text_type === 'TRANSLATION') ??
        ({
          ...defaultTranslation,
        } as TextContentDto),
    ];

    return textSource as TextContentDto[];
  });

  const uploadExcel = (file: File) => {
    return httpRequest.postFile<TextWithRelations>(
      `/api/text/${textId.value}/upload`,
      file,
    );
  };

  return { text, textId, uploadExcel, saveOrUpdate, sources };
});
