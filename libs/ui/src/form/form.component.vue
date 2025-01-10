<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue';
import { ref } from 'vue';

import { tailwindRenderers } from './renderes';

type Data = {
  [key: string]: any;
};

export type SubmitFormEvent = {
  data: Data;
  valid: boolean;
};

const properties = defineProps<{
  id: string;
  schema: any;
  uischema: any;
}>();

const formData = defineModel({});
const emits = defineEmits(['valid', 'change', 'submit']);
const valid = ref(false);
const onChange = (event: Data) => {
  formData.value = event.data;
  valid.value = event.errors.length === 0;
  emits('valid', valid.value);
  emits('change', event.data);
};

const onSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  emits('submit', {
    data: formData.value,
    valid: valid.value,
  } as SubmitFormEvent);
};
</script>

<template>
  <form
    :id="id"
    @submit="onSubmit"
  >
    <json-forms
      :data="formData"
      :schema="schema"
      :uischema="uischema"
      :renderers="tailwindRenderers"
      @change="onChange"
      @submit="onSubmit"
    />
  </form>
</template>
