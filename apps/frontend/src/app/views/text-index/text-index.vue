<script setup lang="ts">
import { textFormSchema } from '@mela/text/shared';
import { useRouter } from 'vue-router';

import { Text } from '@ghentcdh/mela/generated/types';
import { FormWithTableCompnent, TableAction } from '@ghentcdh/ui';

const formId = 'text-index';
const urlSchema = '/api/text/schema';
const router = useRouter();

const tableActions: TableAction[] = [
  {
    label: 'Phrases',
    action: (data: Text) => {
      router.replace({
        name: 'text-index-phrase-list',
        params: { textId: data.id },
      });
    },
  },
];
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <FormWithTableCompnent
      :id="formId"
      :create-title="'Create text'"
      :update-title="'Update text'"
      :url-schema="urlSchema"
      :table-actions="tableActions"
      :form-schema="textFormSchema"
      table-title="Texts"
    />
  </div>
</template>
