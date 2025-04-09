<script setup lang="ts">
import { TextFormSchema } from '@mela/text/shared';
import { useRouter } from 'vue-router';

import { FormWithTableCompnent } from '@ghentcdh/json-forms/vue';
import type { TextContentWithRelations } from '@ghentcdh/mela/generated/types';

const formId = 'text-index';
const router = useRouter();

const edit = (data: any) => {
  router.push({
    name: 'text-index-annotate',
    params: { textId: data?.id },
  });
};

const formSchema = TextFormSchema.schema;

const initialData = {
  textContent: [
    {
      language: 'gr',
      content: '',
      text_type: 'SOURCE',
    } as TextContentWithRelations,
    {
      language: 'en',
      content: '',
      text_type: 'TRANSLATION',
    } as TextContentWithRelations,
  ],
};
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <FormWithTableCompnent
      :id="`form_table_${formId}`"
      :create-title="'Create text'"
      :update-title="'Update text'"
      :form-schema="formSchema"
      :initial-data="initialData"
      table-title="Texts"
      @edit-data="edit"
    />
  </div>
</template>
