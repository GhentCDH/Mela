<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue';

import { tailwindRenderers } from './renderes';

type Data = {
  [key: string]: any;
};

const properties = defineProps<{
  id: string;
  schema: any;
  uischema: any;
}>();
const formData = defineModel({});
const emits = defineEmits('valid');

const onChange = (event: Data) => {
  formData.value = event.data;
  emits('valid', event.errors.length === 0);
};
</script>

<template>
  <form :id="id">
    <json-forms
      :data="formData"
      :schema="schema"
      :uischema="uischema"
      :renderers="tailwindRenderers"
      @change="onChange"
    />
  </form>
</template>
