<template>
  <AnnotationSelectionModal
    v-bind="properties"
    v-model="selection"
    annotation-type="example"
    :enable-save="false"
    :schema="schema"
  >
    <template #custom-content>
      <FormComponent
        id="registerForm"
        v-model="exampleMetadata"
        :schema="ExampleFormSchema.schema.form.schema"
        :uischema="ExampleFormSchema.schema.form.uiSchema"
        @valid="changeValid"
      />
      {{ exampleMetadata }}
    </template>
    <template #custom-actions>
      <Btn
        :disabled="!selection || !valid"
        @click="onSubmit"
      >
        Save
      </Btn>
    </template>
  </AnnotationSelectionModal>
</template>

<script setup lang="ts">
import {
  AnnotationExampleSchema,
  type AnnotationStartEnd,
  ExampleFormSchema,
} from '@mela/text/shared';
import { ref } from 'vue';

import { FormComponent } from '@ghentcdh/json-forms/vue';
import { Btn } from '@ghentcdh/ui';

import type { ExampleSelectionModalProps } from './annotation-selection-modal.props';
import AnnotationSelectionModal from './annotation-selection-modal.vue';
import { createSelection } from './selection.utils';
import { useAnnotationStore } from '../../store/annotation.store';

const valid = ref(false);

const properties = withDefaults(defineProps<ExampleSelectionModalProps>(), {
  mode: 'create',
});
const emits = defineEmits(['closeModal']);

const annotationStore = useAnnotationStore(properties.storeId);
const exampleMetadata = ref({});
const selection = ref<AnnotationStartEnd>();
const schema = AnnotationExampleSchema;

const changeValid = (v: boolean) => {
  valid.value = v;
};

const onSubmit = () => {
  const data = createSelection(
    selection.value,
    'example',
    properties.annotation,
    properties.textContent,
    schema,
    { example: exampleMetadata.value },
  );

  const annotationId =
    properties.mode === 'create' ? null : properties.annotation.id;
  annotationStore.saveOrCreateAnnotation(annotationId, data);

  emits('closeModal', { valid: true, data });
};
</script>
