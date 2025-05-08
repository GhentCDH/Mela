<script setup lang="ts">
import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/vue';
import { provide, ref, watch } from 'vue';

import { myStyles } from '@ghentcdh/ui';

import { tailwindRenderers } from './renderes';
import type { FormEventListener } from './state/form.state';
import { useFormState } from './state/form.state';

type Data = {
  [key: string]: any;
};

export type SubmitFormEvent = {
  data: Data;
  valid: boolean;
};

const properties = withDefaults(
  defineProps<{
    id: string;
    schema: any;
    uischema: any;
    renderers?: JsonFormsRendererRegistryEntry[];
    eventListener?: FormEventListener;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
    renderers: undefined,
    eventListener: undefined,
  },
);

const _JSON_FORM_ID = `json-form-${Date.now()}`;
const formState = useFormState(_JSON_FORM_ID);
const formData = defineModel<any>();
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

watch(
  () => properties.eventListener,
  () => {
    if (properties.eventListener)
      formState.registerEventListener(_JSON_FORM_ID, properties.eventListener);
  },
  { immediate: true },
);

provide('styles', myStyles);
const renderers = Object.freeze([
  ...(properties.renderers ?? []),
  ...tailwindRenderers,
]);
</script>

<template>
  <form
    :id="id"
    @on-submit="onSubmit"
  >
    <json-forms
      :key="id"
      :data="formData"
      :schema="schema"
      :uischema="uischema"
      :renderers="renderers"
      :enabled="!disabled"
      @change="onChange"
      @submit="onSubmit"
    />
  </form>
</template>
