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
import { isIntegerControl, rankWith } from '@jsonforms/core';
import type { RendererProps } from '@jsonforms/vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { defineComponent } from 'vue';

import { inputClasses , useVanillaControlCustom } from '@ghentcdh/ui';

import ControlWrapper from './ControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'IntegerControlRenderer',
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
      return options.step ?? 1;
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
  tester: rankWith(1, isIntegerControl),
};
</script>
