import { defineStore } from 'pinia';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import { createRepository } from '@ghentcdh/json-forms-vue';
import { NotificationService } from '@ghentcdh/ui';

export const useAnnotationRepository = defineStore(
  'annotationRepository',
  () => {
    const httpRequest = useHttpRequest();

    const repo = createRepository(
      { uri: '/api/annotation/type' },
      httpRequest,
      {
        notification: {
          show: true,
          entityType: 'Annotation',
          notification: NotificationService,
        },
      },
    );

    return { ...repo };
  },
);
