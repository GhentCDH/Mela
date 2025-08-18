import { ChapterFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { createRepository } from '@ghentcdh/json-forms/vue';
import { NotificationService } from '@ghentcdh/ui';

export const useChapterRepository = defineStore('useChapterRepository', () => {
  const httpRequest = useHttpRequest();

  const repo = createRepository(ChapterFormSchema.schema, httpRequest, {
    notification: {
      show: true,
      entityType: 'Chapter',
      notification: NotificationService,
    },
  });

  return { ...repo };
});
