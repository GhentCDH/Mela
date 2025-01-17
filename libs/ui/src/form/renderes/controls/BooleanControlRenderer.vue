<template>
  <div class="pointer checkbox-wrapper">
    <control-wrapper v-bind="controlWrapper">
      <input
        :id="control.id + '-input'"
        type="checkbox"
        class="checkbox"
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
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  isBooleanControl,
  rankWith,
} from '@jsonforms/core';
import {
  RendererProps,
  rendererProps,
  useJsonFormsControl,
} from '@jsonforms/vue';
import { defineComponent } from 'vue';

import { ControlRendererType } from '@ghentcdh/tools/form';

import ControlWrapper from './ControlWrapper.vue';
import { useVanillaControlCustom } from './utils/vanillaControl';

const controlRenderer = defineComponent({
  name: ControlRendererType.number,
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
