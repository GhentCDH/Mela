<template>
  <fieldset :class="styles.control.wrapper">
    <legend v-if="!hideLabel" :class="styles.control.label">
      {{ label }} <span v-if="showAsterisk">*</span>
    </legend>
    <slot />
    <p :class="['fieldset-label h-4', { 'text-error': showErrors }]">
      {{ showErrors ? errors : showDescription ? description : null }}
    </p>
  </fieldset>
</template>

<script lang="ts" setup>
import { isDescriptionHidden } from '@jsonforms/core';
import { computed } from 'vue';

import { showErrors as _showErrors } from '../utils/style';
import { ControlWrapperProperties } from './properties';

// TODO check what is used?
const properties = defineProps(ControlWrapperProperties);
const showDescription = computed(() => {
  return !isDescriptionHidden(
    properties.visible,
    properties.description,
    properties.isFocused,
    true,
  );
});

const showAsterisk = computed(() => {
  return properties.required;
});

const showErrors = computed(() => {
  return _showErrors(
    properties.isTouched,
    properties.isFocused,
    properties.errors,
  );
});
</script>
