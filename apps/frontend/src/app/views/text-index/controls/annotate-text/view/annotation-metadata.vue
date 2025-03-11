<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      Selected text:
    </legend>
    {{ selectedText }}
  </fieldset>
  <SelectComponent
    v-model="metaDataModel.annotationType"
    label="Annotation type"
    :options="annotationTypes"
    :disabled="disabled"
    @change="onChangeAnnotationType"
  />

  <FormComponent
    v-if="metaDataModel.annotationType.id === 'example'"
    id="registerForm"
    v-model="metaDataModel"
    :disabled="disabled"
    :schema="ExampleFormSchema.schema.form.schema"
    :uischema="ExampleFormSchema.schema.form.uiSchema"
    @valid="onValid($event)"
  />
</template>

<script setup lang="ts">
import type { AnnotationMetadataType } from '@mela/text/shared';
import { ExampleFormSchema } from '@mela/text/shared';
import { onMounted } from 'vue';

import { FormComponent } from '@ghentcdh/json-forms/vue';
import { SelectComponent } from '@ghentcdh/ui';

import { IdentifyColor } from '../../identify.color';

const annotationTypes = IdentifyColor;

type Properties = {
  selectedText: string;
  disabled: boolean;
};
const properties = defineProps<Properties>();
const emits = defineEmits<{
  valid: [boolean];
}>();

const metaDataModel = defineModel<{
  annotationType: { label: string; id: AnnotationMetadataType };
  [key: string]: any;
}>();

const onValid = (value: boolean) => {
  emits('valid', value);
};

onMounted(() => {
  onChangeAnnotationType();
});

const onChangeAnnotationType = () => {
  if (metaDataModel.value.annotationType.id === 'example') {
    emits('valid', metaDataModel.value.register?.id !== undefined);
  } else {
    emits('valid', true);
  }
};
</script>
