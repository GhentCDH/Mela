<script setup lang="ts">
import { ref } from 'vue';

import type { FormSchemaModel } from '@ghentcdh/tools/form';
import { Btn, Color } from '@ghentcdh/ui';

import FormComponent from './form.component.vue';
import { useFormStore } from './form.store';

const properties = defineProps<{
  id: string;
  createTitle: string;
  updateTitle?: string;
  formSchema: FormSchemaModel;
}>();
const valid = ref(false);
const formData = defineModel<any>();

const store = useFormStore(properties.id);

const emits = defineEmits(['success']);

const save = () => {
  store.save(formData.value.id, formData.value).then(() => {
    emits('success');
  });
};

const clear = () => {
  formData.value = { id: null };
};

const onValid = (v: boolean) => {
  valid.value = v;
};
</script>

<template>
  <div class="card w-full shadow border-2">
    <div class="card-body">
      <h1 class="card-title">
        {{ formData?.id ? updateTitle : createTitle }}
      </h1>
      <FormComponent
        :id="`form_${properties.id}`"
        v-model="formData"
        :schema="formSchema.form.schema"
        :uischema="formSchema.form.uiSchema"
        @valid="onValid($event)"
        @submit="save"
      />
      <div class="card-actions flex justify-end">
        <Btn
          :outline="true"
          @click="clear"
        >
          Clear
        </Btn>
        <Btn
          :color="Color.primary"
          :disabled="!valid"
          @click="clear"
        >
          Save
        </Btn>
      </div>
    </div>
  </div>
</template>
