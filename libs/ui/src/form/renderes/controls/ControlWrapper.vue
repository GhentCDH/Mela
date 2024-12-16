<template>
  <label
    v-if="visible"
    :id="id"
    :for="id + '-input'"
    class="form-control w-full max-w-xs"
  >
    <div class="label">
      <span class="label-text">
        {{ label }}
        <span v-if="showAsterisk">*</span>
      </span>
    </div>
    <slot />
    <div class="label text-sm text-gray-500">
      <span :class="{ 'text-error': errors }">
        {{ errors ? errors : showDescription ? description : null }}
      </span>
    </div>
  </label>
</template>

<script lang="ts">
import { isDescriptionHidden } from '@jsonforms/core';
import { Options } from '@vitejs/plugin-vue';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'ControlWrapper',
  props: {
    id: {
      required: true,
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
  },
  computed: {
    showDescription(): boolean {
      return !isDescriptionHidden(
        this.visible,
        this.description,
        this.isFocused,
        true
      );
    },
    showAsterisk(): boolean {
      return this.required; //&& !this.appliedOptions?.hideRequiredAsterisk;
    },
  },
});
</script>
