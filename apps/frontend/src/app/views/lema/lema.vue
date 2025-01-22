<script setup lang="ts">
import { LemaFormSchema } from '@mela/text/shared';

import { FormWithTableCompnent } from '@ghentcdh/ui';

const formId = 'register';
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <FormWithTableCompnent
      :id="formId"
      :create-title="'Create Lema'"
      :update-title="'Update Lema'"
      :form-schema="LemaFormSchema.schema"
      table-title="Lema"
    />
  </div>
</template>
