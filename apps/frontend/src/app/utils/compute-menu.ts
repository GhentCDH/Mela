import type { BookWithRelations } from '@ghentcdh/mela/generated/types';
import type { MenuWithItems } from '@ghentcdh/ui';

export const computeMenu = (book: BookWithRelations): MenuWithItems[] => {
  return [
    {
      label: 'Chapters',
      items: book?.chapter?.map((chapter) => ({
        label: `${chapter.chapter_number} - ${chapter.name}`,
        action: {
          routerLink: 'chapter-detail',
          params: { chapterId: chapter.id },
        },
      })),
    },
  ].filter((m) => !!m);
};
