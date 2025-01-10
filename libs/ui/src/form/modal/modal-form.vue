<template>
  <Btn :icon="icon" @click="openModal" :outline="true">
    {{ buttonLabel }}
  </Btn>
  <dialog :id="id" class="modal">
    <div class="modal-box">
      <button
        type="button"
        @click="closeModal"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      >
        ✕
      </button>
      <h3 class="font-bold">{{ modalTitle }}</h3>
      <div>
        <slot name="content-before"></slot>
        <FormComponent
          :id="`filter-${id}`"
          v-model="formData"
          :schema="schema"
          :uischema="uischema"
          @valid="onValid($event)"
          @change="onChange"
        />
        <slot name="content-after"></slot>
      </div>
      <div class="modal-action">
        <slot name="modal-actions"></slot>
        <Btn color="btn-primary" @click="onSubmit" :disabled="!valid">
          {{ buttonLabel }}
        </Btn>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { IconDef } from '../../icons';
import { Btn } from '@ghentcdh/ui';
import { Layout } from '@jsonforms/core/src/models/uischema';
import { JsonSchema } from '@jsonforms/core';
import FormComponent, { SubmitFormEvent } from '../form.component.vue';
import { ref } from 'vue';

defineProps<{
  icon?: IconDef;
  modalTitle: string;
  buttonLabel: string;
  schema: JsonSchema;
  uischema: Layout;
}>();

const id = `modal_${Math.floor(Math.random() * 1000)}`;

const valid = ref(false);
const formData = defineModel<any>();
const emits = defineEmits(['submit']);

const onValid = (v: boolean) => {
  valid.value = v;
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
};

const onSubmit = (event: SubmitFormEvent) => {
  if (!valid.value) return;

  emits('submit', { data: formData.value, valid: valid.value });
  closeModal();
};
</script>
