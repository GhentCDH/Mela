import { SectionFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';
import { createRepository } from '@ghentcdh/json-forms-vue';
import { NotificationService } from '@ghentcdh/ui';
import { useApi } from '@ghentcdh/tools-vue';

export const useSectionRepository = defineStore('useSectionRepository', () => {
  const repo = createRepository(SectionFormSchema.schema, useApi(), {
    notification: {
      show: true,
      entityType: 'Section',
      notification: NotificationService,
    },
  });

  return { ...repo };
});
