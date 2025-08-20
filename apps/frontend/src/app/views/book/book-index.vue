<script setup lang="ts">
import { BookFormSchema } from '@mela/text/shared';
import { useRouter } from 'vue-router';

import type { FormEventListener } from '@ghentcdh/json-forms-vue';
import { FormWithTableComponent } from '@ghentcdh/json-forms-vue';
import type { Book, Chapter } from '@ghentcdh/mela/generated/types';
import { IconEnum } from '@ghentcdh/ui';

const formId = 'book-index';

const formSchema = BookFormSchema.schema;
const router = useRouter();

const openChapter = (data: Chapter) => {
  router.push({
    name: 'chapter-detail',
    params: { chapterId: data.id, bookId: data.book_id },
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
    action: (data: Book) => {
      router.push({
        name: 'book-detail',
        params: { bookId: data.id },
      });
    },
  },
];
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <FormWithTableComponent
      :id="`form_table_${formId}`"
      :create-title="'Create book'"
      :update-title="'Update book'"
      :form-schema="formSchema"
      :event-listener="eventListener"
      :table-actions="tableActions"
      table-title="Books"
    />
  </div>
</template>
