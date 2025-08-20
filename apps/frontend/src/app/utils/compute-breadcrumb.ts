import type {
  BookWithRelations,
  Chapter,
} from '@ghentcdh/mela/generated/types';

export const computeBreadcrumb = (
  book: BookWithRelations,
  chapter: Chapter,
) => {
  return [
    {
      label: 'Books',
      routerLink: 'book-index',
    },
    {
      label: `${book?.name} (${book?.author?.name})`,
      routerLink: 'book-detail',
      params: { bookId: book?.id },
    },
    chapter
      ? {
          label: `${chapter?.chapter_number} - ${chapter?.name}`,
          routerLink: 'chapter-detail',
          params: { bookId: book?.id, chapterId: chapter?.id },
        }
      : null,
  ].filter((m) => !!m);
};
