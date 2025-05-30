import { LemmaFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { createRepository } from '@ghentcdh/json-forms/vue';
import { useNotificationStore } from '@ghentcdh/ui';

export const useLemmaRepository = defineStore('lemmaRepository', () => {
  const httpRequest = useHttpRequest();
  const notificationStore = useNotificationStore();

  const repo = createRepository(LemmaFormSchema.schema, httpRequest, {
    notification: {
      show: true,
      entityType: 'Lemma',
      notification: notificationStore,
    },
  });

  return { ...repo };
});
