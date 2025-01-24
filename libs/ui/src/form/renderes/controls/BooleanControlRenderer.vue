<template>
  <div class="pointer checkbox-wrapper items-center">
    <control-wrapper
      v-bind="controlWrapper"
      :styles="styles"
      :full-width="false"
    >
      <input
        :id="control.id + '-input'"
        type="checkbox"
        :class="['checkbox']"
        :value="control.data"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="appliedOptions.placeholder"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      >
    </control-wrapper>
  </div>
</template>

<script lang="ts">
import type {
  ControlElement,
  JsonFormsRendererRegistryEntry,
} from '@jsonforms/core';
import { isBooleanControl, rankWith } from '@jsonforms/core';
import type { RendererProps } from '@jsonforms/vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { defineComponent } from 'vue';

import ControlWrapper from './ControlWrapper.vue';
import { useVanillaControlCustom } from './utils/vanillaControl';

const controlRenderer = defineComponent({
  name: 'BooleanControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaControlCustom(useJsonFormsControl(props), (target) =>
      target.value === '' ? false : Boolean(target.value),
    );
  },
  computed: {},
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isBooleanControl),
};
</script>
