import { LemmaFormSchema } from '@mela/text/shared';
import { defineStore } from 'pinia';
import { createRepository } from '@ghentcdh/json-forms-vue';
import { NotificationService } from '@ghentcdh/ui';
import { useApi } from '@ghentcdh/tools-vue';

export const useLemmaRepository = defineStore('lemmaRepository', () => {
  const repo = createRepository(LemmaFormSchema.schema, useApi, {
    notification: {
      show: true,
      entityType: 'Lemma',
      notification: NotificationService,
    },
  });

  return { ...repo };
});
