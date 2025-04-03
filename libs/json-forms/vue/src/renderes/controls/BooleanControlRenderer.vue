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
          :checked="control.data"
          :disabled="!control.enabled"
          :autofocus="appliedOptions.focus"
          :placeholder="appliedOptions.placeholder"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
        />
        <span class="font-bold text-gray-500 text-sm">
          {{ control.label }}</span
        >
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

import { ControlWrapper, useVanillaControlCustom } from '@ghentcdh/ui';

const controlRenderer = defineComponent({
  name: 'BooleanControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const control = useVanillaControlCustom(
      useJsonFormsControl(props),
      (target) => {
        return Boolean(target.value) ?? false;
      },
    );

    if (control.control.value.data === undefined) {
      control.handleChange(control.control.value.path, false);
    }

    return control;
  },
  computed: {
    controlWrapper() {
      return controlWrapper;
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isBooleanControl),
};
</script>
