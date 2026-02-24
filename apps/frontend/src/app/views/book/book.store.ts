import type { TextContentDto } from '@mela/text/shared';
import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, effect, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import type {
  BookWithRelations,
  Chapter,
  ChapterWithRelations,
  TextContentWithRelations,
} from '@mela/generated-types';
import { NotificationService } from '@ghentcdh/ui';

import router from '../../../router';
import { useBookRepository } from '../../repository/book.repository';
import { useChapterRepository } from '../../repository/chapter.repository';
import { ReloadRef } from './text-index/controls/annotate-text/utils/reload';

export const NEW_CHAPTER_ID = 'NEW_CHAPTER';

export const useBookStore = defineStore('bookStore', () => {
  const route = useRoute();
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
  const chapters = computed(() => book.value?.chapter ?? []);

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

  const reload = ReloadRef();
  const chapter = ref<ChapterWithRelations | null>(null);

  const getChapter = async () => {
    if (!chapterId.value) return null;

    if (chapterId.value === NEW_CHAPTER_ID) {
      return {
        chapter_number: '',
        name: '',
        text: [{ textContent: [defaultSource, defaultTranslation] }],
        book: { id: bookId.value },
      };
    }

    return chapterRepository
      .get(chapterId.value)
      .then((chapter: ChapterWithRelations) => {
        if (chapter.book_id !== bookId.value) {
          NotificationService.error('Chapter is no part of the book');
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
        return {
          ...chapter,
          text: [{ ...text, textContent }],
        };
      });
  };

  effect(() => {
    const _chapterId = chapterId.value;
    chapter.value = null;

    getChapter().then((_chapter: ChapterWithRelations) => {
      if (!_chapter) return;
      if (!_chapter.id && _chapterId !== NEW_CHAPTER_ID) return;
      if (_chapter.id !== chapterId.value) return;

      chapter.value = _chapter;
    });
  });

  const book = computedAsync(() => {
    if (!bookId.value) return null;

    return bookRepository.get(bookId.value) as Promise<BookWithRelations>;
  });

  const create = async (chapter: Partial<ChapterWithRelations>) => {
    const createdChapter = (await chapterRepository.create(chapter)) as Chapter;

    void router.push({
      name: 'chapter-detail',
      params: { chapterId: createdChapter.id, bookId: bookId.value },
    });

    return createdChapter;
  };

  const update = async (chapter: Partial<ChapterWithRelations>) => {
    const updatedChapter = await chapterRepository.patch(
      chapterId.value,
      chapter,
    );
    reload.reload();

    return updatedChapter;
  };

  const saveOrUpdate = (chapter: Partial<ChapterWithRelations>) => {
    return chapterId.value === NEW_CHAPTER_ID
      ? create(chapter)
      : update(chapter);
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

  return { chapter, chapterId, saveOrUpdate, sources, book, chapters };
});
