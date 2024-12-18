<script setup lang="ts">
import { FormWithTableCompnent ,TableAction} from '@ghentcdh/ui';

const formId = 'text-index';
const urlSchema = '/api/text/schema';

const tableActions: TableAction[] = [
  {
    name: 'delete',
    label: 'Delete',
    icon: 'trash',
    color: 'red',
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
    />
  </div>
</template>
