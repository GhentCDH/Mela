<template>
  <ControlWrapper v-bind="controlWrapper" :styles="styles">
    <input
      :id="control.id + '-input'"
      type="text"
      :class="inputClass"
      :value="control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      autocomplete="off"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  </ControlWrapper>
</template>

<script lang="ts">
import type {
  ControlElement,
  JsonFormsRendererRegistryEntry,
} from '@jsonforms/core';
import { rankWith } from '@jsonforms/core';
import type { RendererProps } from '@jsonforms/vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { defineComponent } from 'vue';

// import { default as ControlWrapper.vue } from './ControlWrapper.vue.vue';
import { inputClasses, useVanillaControlCustom } from '@ghentcdh/ui';

import ControlWrapper from './ControlWrapper.vue';
import { isStringFormat } from '../tester';

const controlRenderer = defineComponent({
  name: 'StringControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControlCustom(
      useJsonFormsControl(props),
      (target) => target.value ?? undefined,
    );
  },
  computed: {
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
  tester: rankWith(1, isStringFormat),
};
</script>
