import type { Section, WorkWithRelations } from '@mela/generated-types';

export const computeBreadcrumb = (
  work: WorkWithRelations,
  section: Section,
) => {
  return [
    {
      label: 'Works',
      routerLink: 'work-index',
    },
    {
      label: `${work?.name} (${work?.author?.name})`,
      routerLink: 'work-detail',
      params: { workId: work?.id },
    },
    section
      ? {
          label: `${section?.section_number} - ${section?.name}`,
          routerLink: 'section-detail',
          params: { workId: work?.id, sectionId: section?.id },
        }
      : null,
  ].filter((m) => !!m);
};
