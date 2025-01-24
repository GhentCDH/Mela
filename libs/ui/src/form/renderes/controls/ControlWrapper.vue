<template>
  <div
    :class="[
      {
        'w-full': fullWidth,
      },
      styles.control.wrapper,
    ]"
  >
    <label
      v-if="visible"
      :id="id"
      :for="id + '-input'"
      :class="[
        styles.control.root,
        {
          'form-field-error': showErrors,
        },
      ]"
    >
      <div :class="[styles.control.label]">
        {{ label }}
        <span v-if="showAsterisk">*</span>
      </div>
      <div class="form-control--content">
        <slot />
      </div>
    </label>
    <div :class="[styles.control.description]">
      <span>
        {{ showErrors ? errors : showDescription ? description : null }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { isDescriptionHidden } from '@jsonforms/core';
import type { Styles } from '@jsonforms/vue-vanilla';
import type { Options } from '@vitejs/plugin-vue';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

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
    fullWidth: {
      required: false as const,
      type: Boolean,
      default: true,
    },
    isTouched: {
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
      return !!(this.isTouched && this.errors);
    },
  },
});
</script>
