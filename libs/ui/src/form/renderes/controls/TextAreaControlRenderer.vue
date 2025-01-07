<template>
  <ControlWrapper v-bind="controlWrapper">
    <textarea
      :id="control.id + '-input'"
      type="text"
      :class="['input', 'h-80']"
      :rows="10"
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
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
} from '@jsonforms/core';
import {
  RendererProps,
  rendererProps,
  useJsonFormsControl,
} from '@jsonforms/vue';
import { defineComponent } from 'vue';

// import { default as ControlWrapper.vue } from './ControlWrapper.vue.vue';
import { ControlRendererType } from '@ghentcdh/tools/form';

import ControlWrapper from './ControlWrapper.vue';
import { isTextAreaControl } from './tester';
import { useVanillaControlCustom } from './utils/vanillaControl';

const controlRenderer = defineComponent({
  name: ControlRendererType.textArea,
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
