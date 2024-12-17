<template>
  <control-wrapper
    v-bind="controlWrapper"
    :is-focused="isFocused"
  >
    numv

    <input
      :id="control.id + '-input'"
      type="number"
      :step="step"
      :class="[
        'input',
        'input-bordered input-primary w-full max-w-xs',
        { 'input-error': control.errors },
      ]"
      :value="control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
  </control-wrapper>
  number abc
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  isNumberControl,
  rankWith,
} from '@jsonforms/core';
import {
  RendererProps,
  rendererProps,
  useJsonFormsControl,
} from '@jsonforms/vue';
import { useVanillaControl } from '@jsonforms/vue-vanilla';
import { defineComponent } from 'vue';

import { ControlRendererType } from '@ghentcdh/tools/form';

import ControlWrapper from './ControlWrapper.vue';

const controlRenderer = defineComponent({
  name: ControlRendererType.number,
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControl(useJsonFormsControl(props), (target) =>
      target.value === '' ? undefined : Number(target.value)
    );
  },
  computed: {
    step(): number {
      const options: any = this.appliedOptions;
      return options.step ?? 0.1;
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isNumberControl),
};
</script>
