<script setup lang="ts">
import { TextFormSchema } from '@mela/text/shared';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import {
  FormWithTableCompnent,
  TableComponent,
  useFormStore,
} from '@ghentcdh/json-forms/vue';

import type {
  Text,
  TextContentWithRelations,
} from '@ghentcdh/mela/generated/types';
import type { TableAction } from '@ghentcdh/ui';
import { Btn, Card, IconEnum } from '@ghentcdh/ui';

const formId = 'text-index';
const urlSchema = '/api/text/schema';
const router = useRouter();

const tableActions: TableAction[] = [
  {
    label: 'Annotate',
    action: (data: Text) => {
      router.replace({
        name: 'text-index-annotate',
        params: { textId: data?.id },
      });
    },
  },
];

let store = useFormStore(formId);
const formSchema = TextFormSchema.schema;
const reload = ref(0);

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

const deleteFn = (data: { id: string }) => {
  // TODO add warning
  store.delete(data).then(() => (reload.value = Date.now()));
};
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <FormWithTableCompnent
      :id="`form_table_${formId}`"
      :create-title="'Create text'"
      :update-title="'Update text'"
      :form-schema="formSchema"
      :tableActions="tableActions"
      :initial-data="initialData"
      table-title="Texts"
    />
  </div>
</template>
