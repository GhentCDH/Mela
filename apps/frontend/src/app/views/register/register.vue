<script setup lang="ts">
import { RegisterFormSchema } from '@mela/text/shared';

import { FormWithTableCompnent } from '@ghentcdh/ui';

const formId = 'register';
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <FormWithTableCompnent
      :id="formId"
      :create-title="'Create Register'"
      :update-title="'Update Register'"
      :form-schema="RegisterFormSchema"
      table-title="Register"
    />
  </div>
</template>
