import { SectionFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';
import { createRepository } from '@ghentcdh/json-forms-vue';
import { NotificationService } from '@ghentcdh/ui';
import { useApi } from '@ghentcdh/tools-vue';
import type { SectionWithRelations } from '@mela/generated-types';

export const useSectionRepository = defineStore('useSectionRepository', () => {
  const repo = createRepository<SectionWithRelations>(
    SectionFormSchema.schema,
    useApi(),
    {
      notification: {
        show: true,
        entityType: 'Section',
        notification: NotificationService,
      },
    },
  );

  const getAnnotations = async (sectionId: string) => {
    return useApi()
      .get(`/section/${sectionId}/annotation`)
      .then((res) => res.data);
  };

  const moveSection = async (sectionId: string, sectionOrder: number) => {
    return useApi()
      .put(`/section/${sectionId}/move`, { section_order: sectionOrder ?? 1 })
      .then((res) => res.data)
      .then((res) => {
        NotificationService.success('Section moved');
        return res.data;
      })
      .catch(() => {
        NotificationService.error('Move section failed');
        throw new Error('Move section failed');
      });
  };

  return { ...repo, getAnnotations, moveSection };
});
