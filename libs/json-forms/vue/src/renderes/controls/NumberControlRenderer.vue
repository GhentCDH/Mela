<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
  >
    <input
      :id="control.id + '-input'"
      autocomplete="off"
      type="number"
      :step="step"
      :class="inputClass"
      :value="control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    >
  </control-wrapper>
</template>

<script lang="ts">
import type {
  ControlElement,
  JsonFormsRendererRegistryEntry,
} from '@jsonforms/core';
import { isNumberControl, rankWith } from '@jsonforms/core';
import type { RendererProps } from '@jsonforms/vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { defineComponent } from 'vue';

import {
  ControlWrapper,
  inputClasses,
  useVanillaControlCustom,
} from '@ghentcdh/ui';

const controlRenderer = defineComponent({
  name: 'NumberControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControlCustom(useJsonFormsControl(props), (target) =>
      target.value === '' ? undefined : Number(target.value),
    );
  },
  computed: {
    step(): number {
      const options: any = this.appliedOptions;
      return options.step ?? 0.1;
    },
    inputClass() {
      return inputClasses(
        this.styles,
        this.isFocused,
        this.isTouched,
        this.controlWrapper?.errors,
      );
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isNumberControl),
};
</script>
