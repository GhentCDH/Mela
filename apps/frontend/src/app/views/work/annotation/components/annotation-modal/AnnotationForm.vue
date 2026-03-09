<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { W3CAnnotation } from '@ghentcdh/annotated-text';

import { FormComponent } from '@ghentcdh/json-forms-vue';
import type { AnnotationType as Type } from '../../../text-index/controls/identify.color';
import { useAnnotationDefStore } from '../../store/annotation-def.store';
import { getMetadata } from '../../utils/metadata';

const formData = defineModel<any>();
const onChange = (data: any) => {};
const onErrors = (errors: any) => {};

const onValid = (valid: boolean) => {
  console.log('valid', valid);
};

const properties = defineProps<{
  annotation?: W3CAnnotation;
  annotationType: Type;
}>();

const annotationDefStore = useAnnotationDefStore();
const schemaDefinition = computed(
  () => annotationDefStore.definition[properties.annotationType].schema,
);

const formValidation = computed(() => {
  const validation = schemaDefinition.value;
  if (!validation.uiSchema) return null;

  return validation;
});

onMounted(() => {
  if (!properties.annotation) {
    formData.value = {};
    return;
  }
  formData.value = getMetadata(properties.annotation, schemaDefinition.value);

  console.log('formdata', formData.value);
});
</script>
<template>
  <FormComponent
    v-if="formValidation"
    :id="`annotation-selection-modal`"
    v-model="formData"
    :schema="formValidation.jsonSchema"
    :uischema="formValidation.uiSchema"
    @valid="onValid($event)"
    @change="onChange"
    @errors="onErrors"
  />
</template>
