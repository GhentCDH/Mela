<template>
  <Btn
    :icon="icon"
    :outline="true"
    @click="openModal"
  >
    {{ buttonLabel }}
  </Btn>

  <dialog
    :id="id"
    class="modal"
  >
    <div class="modal-box">
      <button
        type="button"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="closeModal"
      >
        ✕
      </button>
      <h3 class="font-bold">
        {{ modalTitle }}
      </h3>
      <div>
        <slot name="content-before" />
        <FormComponent
          :id="`filter-${id}`"
          v-model="formData"
          :schema="schema"
          :uischema="uischema"
          @valid="onValid($event)"
          @change="onChange"
        />
        <slot name="content-after" />
      </div>
      <div class="modal-action">
        <slot name="modal-actions" />
        <Btn
          :outline="true"
          @click="onClear"
        >
          Clear
        </Btn>
        <Btn
          color="btn-primary"
          :disabled="!valid"
          @click="onSubmit"
        >
          {{ buttonSaveLabel ?? buttonLabel }}
        </Btn>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { JsonSchema } from '@jsonforms/core';
import { Layout } from '@jsonforms/core/src/models/uischema';
import { ref } from 'vue';

import { Btn } from '../../button';
import { IconDef } from '../../icons';
import FormComponent, { SubmitFormEvent } from '../form.component.vue';

defineProps<{
  icon?: IconDef;
  modalTitle: string;
  buttonLabel: string;
  buttonSaveLabel?: string;
  schema: JsonSchema;
  uischema: Layout;
  data: any;
}>();

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

const openModal = () => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  modal.showModal();
};

const closeModal = () => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  modal.close();
  emits('closeModal');
};

const onSubmit = (event: SubmitFormEvent) => {
  if (!valid.value) return;

  emits('submit', { data: formData.value, valid: valid.value });
  closeModal();
};

defineExpose({ closeModal, openModal });
</script>
