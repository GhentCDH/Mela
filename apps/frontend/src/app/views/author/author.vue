<script setup lang="ts">
import { authorFormSchema } from '@mela/text/shared';

import { FormWithTableCompnent } from '@ghentcdh/ui';

const formId = 'author';
const urlSchema = '/api/author/schema';
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <FormWithTableCompnent
      :id="formId"
      :create-title="'Create Author'"
      :update-title="'Update Author'"
      :url-schema="urlSchema"
      :form-schema="authorFormSchema"
      table-title="Authors"
    />
  </div>
</template>
