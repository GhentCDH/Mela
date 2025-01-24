<template>
  <div
    v-if="store.text"
    class="max-w-screen-lg m-auto"
  >
    <FormComponent
      id="text-detail"
      v-model="formData"
      :schema="formSchema.form.schema"
      :uischema="formSchema.form.uiSchema"
      @valid="onValid($event)"
      @change="onChange"
    />
  </div>
</template>
<script setup lang="ts">
import { TextFormSchema, textParseFileTypes } from '@mela/text/shared';
import { ref } from 'vue';

import { useTextStore } from './text.store';
import FormComponent from '../../../../../../libs/ui/src/form/form.component.vue';

const store = useTextStore();

const excellFile = ref<File | null>(null);
const allowedFileTypes = textParseFileTypes.join(', ');

const onFilePicked = (event: Event) => {
  const files = event.target.files;
  const fileReader = new FileReader();
  fileReader.readAsDataURL(files[0]);
  excellFile.value = files[0];
};
const upload = () => {
  store.uploadExcel(excellFile.value);
};

const formSchema = TextFormSchema.schema;
const formData = ref(store.text);

const valid = ref(false);
const emits = defineEmits(['submit', 'clear', 'closeModal']);

const onValid = (v: boolean) => {
  valid.value = v;
};

const onClear = () => {
  formData.value = store.text;
  emits('clear');
};

const onChange = (data: any) => {
  formData.value = data;
};
</script>
