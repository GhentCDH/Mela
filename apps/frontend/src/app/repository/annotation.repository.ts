import { AnnotationFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { createRepository } from '@ghentcdh/json-forms/vue';
import { useNotificationStore } from '@ghentcdh/ui';

export const useAnnotationRepository = defineStore(
  'annotationRepository',
  () => {
    const httpRequest = useHttpRequest();
    const notificationStore = useNotificationStore();

    const repo = createRepository(AnnotationFormSchema.schema, httpRequest, {
      notification: {
        show: true,
        entityType: 'AnnotationFormSchema',
        notification: notificationStore,
      },
    });

    return { ...repo };
  },
);
