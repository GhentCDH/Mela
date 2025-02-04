<template>
  <ControlWrapper
    v-bind="controlWrapper"
    :styles="styles"
  >
    {{ sourceText.content }}---
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
import type { TextContent } from '@ghentcdh/mela/generated/types';
import {
  ControlWrapper,
  inputClasses,
  isCustomControl,
  useVanillaControlCustom,
} from '@ghentcdh/ui';

const controlRenderer = defineComponent({
  name: 'IdentifyTextBlocks',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    console.log(props.cells);
    console.table(props.cells);
    console.log(useJsonFormsControl(props).control.value);
    return useVanillaControlCustom(
      useJsonFormsControl(props),
      (target) => target.value ?? undefined,
    );
  },
  computed: {
    sourceText() {
      return this.control.data?.find(
        (d: TextContent) => d.text_type === 'SOURCE',
      );
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

export const identifyTextBlocks: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isCustomControl('identify_text_blocks')),
};
</script>
