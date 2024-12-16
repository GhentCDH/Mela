<script setup lang="ts">
import { FormComponent } from '@ghentcdh/ui';

const formId = 'author';
const urlSchema = '/api/author/schema';
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <FormComponent
      :id="formId"
      :create-title="'Create Author'"
      :update-title="'Update Author'"
      :url-schema="urlSchema"
    />
  </div>
</template>
