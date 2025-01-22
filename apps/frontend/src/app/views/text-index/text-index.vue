<script setup lang="ts">
import { TextFormSchema } from '@mela/text/shared';
import { useRouter } from 'vue-router';

import type { Text } from '@ghentcdh/mela/generated/types';
import type { TableAction } from '@ghentcdh/ui';
import { FormWithTableCompnent } from '@ghentcdh/ui';

const formId = 'text-index';
const urlSchema = '/api/text/schema';
const router = useRouter();

const tableActions: TableAction[] = [
  {
    label: 'Phrases',
    action: (data: Text) => {
      router.replace({
        name: 'text-index-phrase',
        params: { textId: data.id },
      });
    },
  },
  {
    label: 'Detail',
    action: (data: Text) => {
      router.replace({
        name: 'text-index-detail',
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
      :form-schema="TextFormSchema.schema"
      table-title="Texts"
    />
  </div>
</template>
