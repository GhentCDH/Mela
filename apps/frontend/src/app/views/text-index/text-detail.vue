<template>
  <div v-if="store.text">
    <FormComponent
      id="text-detail"
      v-model="formData"
      :schema="formSchema.form.schema"
      :uischema="formSchema.form.uiSchema"
      :events="events"
      :renderers="TextControls"
      @valid="onValid($event)"
      @change="onChange"
    />
  </div>
</template>
<script setup lang="ts">
import { TextFormSchema, textParseFileTypes } from '@mela/text/shared';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import type { StepperEvent, StepperEventListener } from '@ghentcdh/ui';
import { FormComponent } from '@ghentcdh/ui';

import { TextControls } from './controls';
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

const onValid = (v: boolean) => {
  valid.value = v;
};

const router = useRouter();

const changeStepper = (event: StepperEventListener, data: StepperEvent) => {
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

watch(
  () => store.text,
  () => {
    formData.value = store.text;
  },
);
</script>
