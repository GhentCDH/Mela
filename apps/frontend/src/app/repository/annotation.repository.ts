import { defineStore } from 'pinia';

import { useApi } from '@ghentcdh/tools-vue';
import { createRepository } from '@ghentcdh/json-forms-vue';
import { NotificationService } from '@ghentcdh/ui';

export const useAnnotationRepository = defineStore(
  'annotationRepository',
  () => {
    const repo = createRepository({ uri: '/annotation/type' }, useApi(), {
      notification: {
        show: true,
        entityType: 'Annotation',
        notification: NotificationService,
      },
    });

    return { ...repo };
  },
);
