<script setup lang="ts">
import { WorkFormSchema } from '@mela/text/shared';
import { useRouter } from 'vue-router';

import type { FormEventListener } from '@ghentcdh/json-forms-vue';
import { FormWithTableComponent } from '@ghentcdh/json-forms-vue';
import type { Section, Work } from '@mela/generated-types';
import { IconEnum } from '@ghentcdh/ui';

const formId = 'work-index';

const formSchema = WorkFormSchema.schema;
const router = useRouter();

const openChapter = (data: Section) => {
  router.push({
    name: 'section-detail',
    params: { sectionId: data.id, workId: data.work_id },
  });
};

const eventListener: FormEventListener = (event, data) => {
  switch (event) {
    case 'edit':
      openChapter(data);
      break;
  }
};

const tableActions = [
  {
    icon: IconEnum.View,
    action: (data: Work) => {
      router.push({
        name: 'section-detail',
        params: { workId: data.id },
      });
    },
  },
];
</script>

<template>
  <div class="max-w-screen-lg m-auto p-4">
    <FormWithTableComponent
      :id="`form_table_${formId}`"
      :create-title="'Create work'"
      :update-title="'Update work'"
      :form-schema="formSchema"
      :event-listener="eventListener"
      :table-actions="tableActions"
      table-title="Works"
    />
  </div>
</template>
