<script setup lang="ts">
const formId = 'author';
const urlSchema = '/api/author/schema';
import { FormWithTableCompnent } from '@ghentcdh/ui';
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <FormWithTableCompnent
      :id="formId"
      :create-title="'Create Author'"
      :update-title="'Update Author'"
      :url-schema="urlSchema"
    />
  </div>
</template>
