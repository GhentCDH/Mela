import { defineStore } from 'pinia';

import { useApi } from '@ghentcdh/tools-vue';
import { createRepository } from '@ghentcdh/json-forms-vue';
import { AnnotationLink } from '@mela/text/shared';
import { NotificationService } from '@ghentcdh/ui';

export const useAnnotationRepository = defineStore(
  'annotationRepository',
  () => {
    const uri = '/annotation/type';
    const linkUrl = `${uri}/link`;

    const repo = createRepository({ uri }, useApi(), {
      notification: {
        show: true,
        entityType: 'Annotation',
        notification: NotificationService,
      },
    });

    const postLink = (data: AnnotationLink) => {
      return useApi()
        .post(linkUrl, data)
        .then((res) => {
          NotificationService.success('Link created');
          return res.data;
        })
        .catch(() => {
          NotificationService.error('Link creation failed');
          throw new Error('Link creation failed');
        });
    };
    const putLink = (id: string, data: AnnotationLink) => {
      return useApi()
        .put(`${linkUrl}/${id}`, data)
        .then((res) => {
          NotificationService.success('Link created');
          return res.data;
        })
        .catch(() => {
          NotificationService.error('Link creation failed');
          throw new Error('Link creation failed');
        });
    };

    return { ...repo, postLink, putLink };
  },
);
