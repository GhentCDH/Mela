import { ChapterFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { createRepository } from '@ghentcdh/json-forms/vue';
import { useNotificationStore } from '@ghentcdh/ui';

export const useChapterRepository = defineStore('useChapterRepository', () => {
  const httpRequest = useHttpRequest();
  const notificationStore = useNotificationStore();

  const repo = createRepository(ChapterFormSchema.schema, httpRequest, {
    notification: {
      show: true,
      entityType: 'Chapter',
      notification: notificationStore,
    },
  });

  return { ...repo };
});
