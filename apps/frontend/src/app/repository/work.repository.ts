import { WorkFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';
import { createRepository } from '@ghentcdh/json-forms-vue';
import { NotificationService } from '@ghentcdh/ui';
import { useApi } from '@ghentcdh/tools-vue';

export const useWorkRepository = defineStore('useWorkRepository', () => {
  const repo = createRepository(WorkFormSchema.schema, useApi(), {
    notification: {
      show: true,
      entityType: 'work',
      notification: NotificationService,
    },
  });

  return { ...repo };
});
