<template>
  <Modal
    v-bind="properties"
    :open="true"
    :disable-close="false"
    :width="formSchema.modalSize ?? 'sm'"
    @close-modal="onCancel"
  >
    <template #content>
      <slot name="content-before" />
      <FormComponent
        :id="`modal-${id}`"
        v-model="formData"
        :schema="formSchema.schema"
        :uischema="formSchema.uiSchema"
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
        @click="onCancel"
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
import { ref } from 'vue';

import { Btn, Color, Modal } from '@ghentcdh/ui';

import FormComponent from '../form.component.vue';
import type { FormModalProps } from './form-modal.props';

const properties = withDefaults(defineProps<FormModalProps>(), {
  cancelLabel: 'cancel',
  saveLabel: 'save',
});

const id = `modal_${Math.floor(Math.random() * 1000)}`;

const valid = ref(false);
const formData = defineModel<any>();
const emits = defineEmits(['closeModal']);

if (properties.data) {
  formData.value = properties.data;
}

const onValid = (v: boolean) => {
  valid.value = v;
};

const onCancel = () => {
  formData.value = {};
  emits('closeModal', null);
};

const onChange = (data: any) => {
  formData.value = data;
};

const onSubmit = () => {
  if (!valid.value) return;

  emits('closeModal', { data: formData.value, valid: valid.value });
};
</script>
