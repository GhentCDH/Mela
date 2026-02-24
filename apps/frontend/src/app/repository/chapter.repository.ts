import { ChapterFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';
import { createRepository } from '@ghentcdh/json-forms-vue';
import { NotificationService } from '@ghentcdh/ui';
import { useApi } from '@ghentcdh/tools-vue';

export const useChapterRepository = defineStore('useChapterRepository', () => {
  const repo = createRepository(ChapterFormSchema.schema, useApi(), {
    notification: {
      show: true,
      entityType: 'Chapter',
      notification: NotificationService,
    },
  });

  return { ...repo };
});
