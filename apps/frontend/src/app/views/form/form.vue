<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { FormWithTableCompnent } from '@ghentcdh/ui';

import type { FormKey } from './form.def';
import { FormDictionary } from './form.def';

const route = useRoute();
const formId = computed(() => route.params['formId']);
const formConfig = computed(() => {
  return FormDictionary[formId.value as FormKey];
});
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <FormWithTableCompnent
      v-if="formConfig"
      id="custom-form"
      :create-title="'Create ' + formConfig.title"
      :update-title="'Update ' + formConfig.title"
      :form-schema="formConfig.formSchema"
      :table-title="formConfig.tableTitle"
    />
  </div>
</template>
