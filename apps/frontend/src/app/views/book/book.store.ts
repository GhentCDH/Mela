import type { TextContentDto } from '@mela/text/shared';
import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type {
  BookWithRelations,
  ChapterWithRelations,
  TextContentWithRelations,
} from '@ghentcdh/mela/generated/types';
import { useNotificationStore } from '@ghentcdh/ui';

import { useBookRepository } from '../../repository/book.repository';
import { useChapterRepository } from '../../repository/chapter.repository';

export const useBookStore = defineStore('bookStore', () => {
  const route = useRoute();
  const router = useRouter();
  const chapterRepository = useChapterRepository();
  const bookRepository = useBookRepository();

  const bookId = ref(route.params.bookId as string);
  const chapterId = ref(route.params.chapterId as string);

  watch(
    () => route.params.chapterId,
    (newId, oldId) => {
      if (newId !== oldId) chapterId.value = newId as string;
    },
  );
  watch(
    () => route.params.bookId,
    (newId, oldId) => {
      if (newId !== oldId) bookId.value = newId as string;
    },
  );
  const notificationStore = useNotificationStore();

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

  const chapter = computedAsync(() => {
    if (!chapterId.value) return null;

    return chapterRepository
      .get(chapterId.value)
      .then((chapter: ChapterWithRelations) => {
        if (chapter.book_id !== bookId.value) {
          notificationStore.error('Chapter is no part of the book');
          return null;
        }
        // for now we only support one text per chapter
        const text = chapter.text?.[0] ?? { textContent: [] };
        const textContent = [
          text.textContent?.find((t) => t.text_type === 'SOURCE') ??
            ({ ...defaultSource } as TextContentWithRelations),
          text.textContent?.find((t) => t.text_type === 'TRANSLATION') ??
            ({
              ...defaultTranslation,
            } as TextContentWithRelations),
        ];
        return { ...chapter, text: [{ ...text, textContent }] };
      });
  });

  const book = computedAsync(() => {
    if (!bookId.value) return null;

    return bookRepository.get(bookId.value) as Promise<BookWithRelations>;
  });

  const saveOrUpdate = (chapter: Partial<ChapterWithRelations>) => {
    return chapterRepository.patch(chapterId.value, chapter);
  };

  const sources = computed(() => {
    const textContent = chapter.value?.text[0].textContent ?? [];

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

  return { chapter, chapterId, saveOrUpdate, sources, book };
});
