<template>
  <AnnotationSelectionModal
    v-bind="properties"
    v-model="selection"
    annotation-type="example"
    :enable-save="false"
    :extra-data="extraData"
    :schema="schema"
    :valid="valid"
    @close-modal="closeModal"
  >
    <template #custom-content>
      <FormComponent
        id="registerForm"
        v-model="exampleMetadata"
        :schema="ExampleFormSchema.schema.form.schema"
        :uischema="ExampleFormSchema.schema.form.uiSchema"
        @valid="changeValid"
      />
    </template>
  </AnnotationSelectionModal>
</template>

<script setup lang="ts">
import {
  AnnotationExampleSchema,
  type AnnotationStartEnd,
  ExampleFormSchema,
  findExampleMetaData,
} from '@mela/text/shared';
import { computed, onMounted, ref } from 'vue';

import { FormComponent } from '@ghentcdh/json-forms/vue';

import type { ExampleSelectionModalProps } from './annotation-selection-modal.props';
import AnnotationSelectionModal from './annotation-selection-modal.vue';

const valid = ref(false);

const properties = withDefaults(defineProps<ExampleSelectionModalProps>(), {
  mode: 'create',
});
const emits = defineEmits(['closeModal']);

const exampleMetadata = ref({});
const selection = ref<AnnotationStartEnd>();
const schema = AnnotationExampleSchema;

const changeValid = (v: boolean) => {
  valid.value = v;
};

onMounted(() => {
  if (!properties.annotation) return;

  const metadata = findExampleMetaData(properties.annotation)?.value;
  exampleMetadata.value = metadata;
});

const extraData = computed(() => {
  return { example: exampleMetadata.value };
});

const closeModal = (event) => {
  emits('closeModal', event);
};
</script>
