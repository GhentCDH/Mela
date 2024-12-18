<script setup lang="ts">
import { FormWithTableCompnent } from '@ghentcdh/ui';

const formId = 'text-index';
const urlSchema = '/api/text/schema';
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
