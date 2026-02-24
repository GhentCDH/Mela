import { BookFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';
import { createRepository } from '@ghentcdh/json-forms-vue';
import { NotificationService } from '@ghentcdh/ui';
import { useApi } from '@ghentcdh/tools-vue';

export const useBookRepository = defineStore('useBookRepository', () => {
  const httpRequest = useApi();

  const repo = createRepository(BookFormSchema.schema, api, {
    notification: {
      show: true,
      entityType: 'Book',
      notification: NotificationService,
    },
  });

  return { ...repo };
});
