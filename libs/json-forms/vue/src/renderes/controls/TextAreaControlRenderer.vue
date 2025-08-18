<template>
  <ControlWrapper v-bind="controlWrapper">
    <textarea
      :id="control.id + '-input'"
      autocomplete="off"
      type="text"
      :class="['input', 'h-32']"
      :rows="15"
      :value="control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
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

import { ControlWrapper } from '@ghentcdh/ui';

import { useVanillaControlCustom } from '../../utils/vanillaControl';
import { isTextAreaControl } from '../tester';

const controlRenderer = defineComponent({
  name: 'TextAreaControlRenderer',
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
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isTextAreaControl),
};
</script>
