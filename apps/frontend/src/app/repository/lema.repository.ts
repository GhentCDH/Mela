import { LemaFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { createRepository } from '@ghentcdh/json-forms/vue';
import { useNotificationStore } from '@ghentcdh/ui';

export const useLemaRepository = defineStore('lemaRepository', () => {
  const httpRequest = useHttpRequest();
  const notificationStore = useNotificationStore();

  const repo = createRepository(LemaFormSchema.schema, httpRequest, {
    notification: {
      show: true,
      entityType: 'Lema',
      notification: notificationStore,
    },
  });

  return { ...repo };
});
