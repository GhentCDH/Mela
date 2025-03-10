<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Selected text:</legend>
    {{ selectedText.value }}
  </fieldset>
  <SelectComponent
    v-model="metaDataModel.annotationType"
    label="Annotation type"
    :options="annotationTypes"
  />

  <Autocomplete
    v-if="metaDataModel.annotationType.id === 'example'"
    v-model="metaDataModel.register"
    label="Register"
    :config="registerConfig"
    :labelKey="'name'"
    :valueKey="'id'"
  />
</template>

<script setup lang="ts">
import {
  AnnotationMetadataType,
  ExampleDto,
  RegisterFormSchema,
} from '@mela/text/shared';
import { cloneDeep } from 'lodash-es';
import { computed, ref, watch } from 'vue';

import type { TextualBody, W3CAnnotation } from '@ghentcdh/annotations/core';
import { findTagging } from '@ghentcdh/annotations/core';
import type { Register } from '@ghentcdh/mela/generated/types';
import { SelectComponent } from '@ghentcdh/ui';
import { IdentifyColor } from '../../identify.color';
import { findTextValue } from '../utils/translation';
import { Autocomplete } from '@ghentcdh/ui';

const annotationTypes = IdentifyColor;

type Properties = {
  // textWithAnnotations: TextWithAnnotations;
  // activeAnnotation: W3CAnnotation;
  selectedText: TextualBody;
  // links: AnnotationWithRelations[];
  // text: Text;
  // textContent: TextContent;
};
const properties = defineProps<Properties>();
let originalAnnotation: W3CAnnotation;

const metaDataModel = defineModel<{
  annotationType: { label: string; id: AnnotationMetadataType };
  register?: Register;
}>();

const emits = defineEmits<{
  changeAnnotation: [W3CAnnotation];
  deleteAnnotation: [W3CAnnotation];
  saveAnnotation: [W3CAnnotation];
  closeAnnotation: [];
  saveExample: [ExampleDto];
}>();

const registerConfig = {
  uri: `${RegisterFormSchema.schema.uri}?filter=name:`,
};
</script>
