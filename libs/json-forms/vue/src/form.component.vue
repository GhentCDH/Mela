<script setup lang="ts">
import type { JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/vue';
import { provide, ref, watch } from 'vue';

import { myStyles } from '@ghentcdh/ui';

import { tailwindRenderers } from './renderes';
import type { StepperEventListener } from './renderes/layouts/stepper.store';
import { useStepperStore } from './renderes/layouts/stepper.store';

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
    events?: {
      stepper?: StepperEventListener;
    };
    disabled?: boolean;
  }>(),
  {
    renderers: [] as JsonFormsRendererRegistryEntry[],
    events: {} as any,
    disabled: false,
  },
);

const formData = defineModel<any>({});
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
  () => properties.events,
  (events) => {
    if (events?.stepper) {
      useStepperStore().registerListener(events.stepper);
    }
  },
  { immediate: true },
);

provide('styles', myStyles);
const renderers = Object.freeze([
  ...properties.renderers,
  ...tailwindRenderers,
]);
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
      :enabled="!disabled"
      @change="onChange"
      @submit="onSubmit"
    />
  </form>
</template>
