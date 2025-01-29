<template>
  <fieldset class="fieldset">
    <legend
      v-if="!hideLabel"
      class="fieldset-legend"
    >
      {{ label }} <span v-if="showAsterisk">*</span>
    </legend>
    <slot />
    <p :class="['fieldset-label h-4', { 'text-error': showErrors }]">
      {{ showErrors ? errors : showDescription ? description : null }}
    </p>
  </fieldset>
</template>

<script lang="ts">
import { isDescriptionHidden } from '@jsonforms/core';
import type { Styles } from '@jsonforms/vue-vanilla';
import type { Options } from '@vitejs/plugin-vue';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import { showErrors } from './utils/style';

export default defineComponent({
  name: 'ControlWrapper',
  props: {
    id: {
      required: false as const,
      type: String,
    },
    description: {
      required: false as const,
      type: String,
      default: undefined,
    },
    errors: {
      required: false as const,
      type: String,
      default: undefined,
    },
    label: {
      required: false as const,
      type: String,
      default: undefined,
    },
    appliedOptions: {
      required: false as const,
      type: Object as PropType<Options>,
      default: undefined,
    },
    visible: {
      required: false as const,
      type: Boolean,
      default: true,
    },
    required: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    isFocused: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    isTouched: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    hideLabel: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    styles: {
      required: true,
      type: Object as PropType<Styles>,
    },
  },
  computed: {
    showDescription(): boolean {
      return !isDescriptionHidden(
        this.visible,
        this.description,
        this.isFocused,
        true,
      );
    },
    showAsterisk(): boolean {
      return this.required; //&& !this.appliedOptions?.hideRequiredAsterisk;
    },
    showErrors(): boolean {
      return showErrors(this.isTouched, this.isFocused, this.errors);
    },
  },
});
</script>
