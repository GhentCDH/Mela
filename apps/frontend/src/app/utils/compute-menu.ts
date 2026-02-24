import type { BookWithRelations } from '@mela/generated-types';
import type { MenuWithItems } from '@ghentcdh/ui';

export type MenuView = 'annotate';

export const computeMenu = (
  book: BookWithRelations,
  view: MenuView | null,
): MenuWithItems[] => {
  const routerLink =
    view === 'annotate' ? 'text-index-annotate' : 'chapter-detail';

  return [
    {
      label: 'Chapters',
      items: book?.chapter?.map((chapter) => ({
        label: `${chapter.chapter_number} - ${chapter.name}`,
        action: {
          routerLink,
          params: {
            chapterId: chapter.id,
            textId: chapter.text[0]?.id,
          },
        },
      })),
    },
  ].filter((m) => !!m);
};
