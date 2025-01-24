<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue';
import { provide, ref } from 'vue';

import { tailwindRenderers } from './renderes';
import { myStyles } from './styles';

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
  console.log('onChange', event);
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

const styles = myStyles;

provide('styles', myStyles);
const renderers = Object.freeze(tailwindRenderers);
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
      :renderers="renderers"
      @change="onChange"
      @submit="onSubmit"
    />
  </form>
</template>
