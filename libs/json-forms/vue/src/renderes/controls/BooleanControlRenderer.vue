<template>
  <div class="flex justify-around flex-col h-full">
    <control-wrapper
      v-bind="controlWrapper"
      :styles="styles"
      :hide-label="true"
    >
      <label class="fieldset-label">
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
        <span class="font-bold text-black"> {{ control.label }}</span>
      </label>
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

import { useVanillaControlCustom } from '@ghentcdh/ui';

import ControlWrapper from './ControlWrapper.vue';

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
