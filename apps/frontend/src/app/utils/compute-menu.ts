import type { WorkWithRelations } from '@mela/generated-types';
import type { MenuWithItems } from '@ghentcdh/ui';

export type MenuView = 'annotate';

export const computeMenu = (
  work: WorkWithRelations,
  view: MenuView | null,
): MenuWithItems[] => {
  const routerLink =
    view === 'annotate' ? 'text-index-annotate' : 'section-detail';

  return [
    {
      label: 'Chapters',
      items: work?.section?.map((section) => ({
        label: `${section.section_number} - ${section.name}`,
        action: {
          routerLink,
          params: {
            sectionId: section.id,
            textId: section.text[0]?.id,
          },
        },
      })),
    },
  ].filter((m) => !!m);
};
