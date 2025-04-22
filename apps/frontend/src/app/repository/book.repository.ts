import { BookFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { createRepository } from '@ghentcdh/json-forms/vue';
import { useNotificationStore } from '@ghentcdh/ui';

export const useBookRepository = defineStore('useBookRepository', () => {
  const httpRequest = useHttpRequest();
  const notificationStore = useNotificationStore();

  const repo = createRepository(BookFormSchema.schema, httpRequest, {
    notification: {
      show: true,
      entityType: 'Book',
      notification: notificationStore,
    },
  });

  return { ...repo };
});
