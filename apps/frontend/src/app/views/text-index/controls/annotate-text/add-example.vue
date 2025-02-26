<template>
  Add example
  <FormComponent
    id="text-detail"
    v-model="formData"
    :schema="formSchema.form.schema"
    :uischema="formSchema.form.uiSchema"
    @valid="onValid($event)"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { FormComponent } from '@ghentcdh/json-forms/vue';
import { ExampleFormSchema } from '@mela/text/shared';
import { ref } from 'vue';
import { useAnnotationStore } from './utils/annotation.store';
import type { EditableAnnotation } from './utils/parse';

const formSchema = ExampleFormSchema.schema;
const formData = ref({});
const valid = ref(false);

type Properties = {
  annotation: EditableAnnotation;
  storeId: string;
};
const properties = defineProps<Properties>();

const store = useAnnotationStore(properties.storeId)();

const onValid = (v: boolean) => {
  valid.value = v;
};

const onChange = (data: any) => {
  formData.value = data;

  store.updateExample(data);
};
</script>
