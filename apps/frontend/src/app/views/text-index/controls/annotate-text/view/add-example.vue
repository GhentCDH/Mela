<template>
  <FormModal
    v-model="initialData"
    :modal-title="'Add Example'"
    :schema="formSchema.schema"
    :uischema="formSchema.uiSchema"
    @submit="submit"
  >
    <template #content-before>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Selected text
        </legend>
        {{ selectedText }}
      </fieldset>
    </template>
  </FormModal>
</template>

<script setup lang="ts">
import { ExampleFormSchema } from '@mela/text/shared';
import { pick } from 'lodash-es';
import { computed } from 'vue';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import { FormModal } from '@ghentcdh/json-forms/vue';

import { findTextValue } from '../utils/translation';

const formSchema = ExampleFormSchema.schema.form;

type Properties = {
  annotation: W3CAnnotation;
  text: Text;
  textContent: SourceModel;
};
const properties = defineProps<Properties>();
const initialData = {
  name: findTextValue(properties.annotation)?.value,
  register: { name: 'bo 123' },
  text: pick(properties.text, 'id'),
  textContent: {
    id: properties.textContent.id,
    language: properties.textContent.content.processingLanguage,
  },
  annotationTarget: pick(properties.annotation, 'id'),
};

console.log(properties.textContent.content);

const emits = defineEmits<{
  closeModal: [W3CAnnotation];
}>();

// const store = useAnnotationStore(properties.storeId)();

const selectedText = computed(
  () => findTextValue(properties.annotation)?.value,
);

const submit = (data) => {
  emits('closeModal', data.data);
};
</script>
