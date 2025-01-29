<template>
  <Card v-if="store.text">
    <FormComponent
      id="text-detail"
      v-model="formData"
      :schema="formSchema.form.schema"
      :uischema="formSchema.form.uiSchema"
      :events="events"
      @valid="onValid($event)"
      @change="onChange"
    />
  </Card>
</template>
<script setup lang="ts">
import { TextFormSchema, textParseFileTypes } from '@mela/text/shared';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type { Card, StepperEvent, StepperEventListener } from '@ghentcdh/ui';
import { FormComponent } from '@ghentcdh/ui';

import { useTextStore } from './text.store';

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

const router = useRouter();

const changeStepper = (event: StepperEventListener, data: StepperEvent) => {
  console.log(event, 'change', data);
  console.log(formData.value);

  if (data.activeStep === 1 || data.activeStep === 2) {
    store.saveOrUpdate(formData.value);
  }
};

const events = {
  stepper: changeStepper,
};

const onChange = (data: any) => {
  formData.value = data;
};
</script>
