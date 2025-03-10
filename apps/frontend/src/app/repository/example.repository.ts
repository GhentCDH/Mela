import { ExampleFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { createRepository } from '@ghentcdh/json-forms/vue';
import { useNotificationStore } from '@ghentcdh/ui';

export const useExampleRepository = defineStore('exampleRepository', () => {
  const httpRequest = useHttpRequest();
  const notificationStore = useNotificationStore();

  const repo = createRepository(ExampleFormSchema.schema, httpRequest, {
    notification: {
      show: true,
      entityType: 'Example',
      notification: notificationStore,
    },
  });

  return { ...repo };
});
