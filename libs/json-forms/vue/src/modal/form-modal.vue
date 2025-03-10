<template>
  <Modal
    :modal-title="modalTitle"
    :open="true"
    :disable-close="false"
  >
    <template #content>
      <slot name="content-before" />
      <FormComponent
        :id="`modal-${id}`"
        v-model="formData"
        :schema="schema"
        :uischema="uischema"
        @valid="onValid($event)"
        @change="onChange"
      />
      <slot name="content-after" />
      {{ formData }}--
    </template>
    <template #actions>
      <Btn
        :color="Color.secondary"
        :outline="true"
        @click="onClear"
      >
        Cancel
      </Btn>
      <Btn
        :disabled="!valid"
        @click="onSubmit"
      >
        Save
      </Btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import type { JsonSchema } from '@jsonforms/core';
import type { Layout } from '@jsonforms/core/src/models/uischema';
import { ref } from 'vue';

import { Btn, Color, Modal } from '@ghentcdh/ui';

import type { SubmitFormEvent } from '../form.component.vue';
import FormComponent from '../form.component.vue';

withDefaults(
  defineProps<{
    modalTitle: string;
    saveLabel?: string;
    cancelLabel?: string;
    schema: JsonSchema;
    uischema: Layout;
  }>(),
  {
    cancelLabel: 'cancel',
    saveLabel: 'save',
  },
);

const id = `modal_${Math.floor(Math.random() * 1000)}`;

const valid = ref(false);
const formData = defineModel<any>();
const emits = defineEmits(['submit', 'clear', 'closeModal']);

const onValid = (v: boolean) => {
  valid.value = v;
};

const onClear = () => {
  formData.value = {};
  emits('clear');
};

const onChange = (data: any) => {
  formData.value = data;
};

const onSubmit = (event: SubmitFormEvent) => {
  if (!valid.value) return;

  emits('submit', { data: formData.value, valid: valid.value });
};
</script>
