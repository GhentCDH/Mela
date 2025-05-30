<template>
  <Autocomplete
    v-bind="controlWrapper"
    v-model="control.data"
    :enabled="control.enabled"
    :config="appliedOptions"
    :label-key="field.label"
    :value-key="field.id"
    @change="handleChange"
    @focus="onFocus"
    @blur="onBlur"
  />
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

import { Autocomplete, useVanillaControlCustom } from '@ghentcdh/ui';

import { isAutoCompleteControl } from '../../tester';

const controlRenderer = defineComponent({
  name: 'AutocompleteControlRenderer',
  components: {
    Autocomplete,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const control = useVanillaControlCustom(
      useJsonFormsControl(props),
      (target) => target.value ?? undefined,
    );

    const field = control.appliedOptions.value.field;

    const handleChange = (result: any) => {
      const { path } = control.control.value;
      control.handleChange(path, result);
    };

    return { ...control, field, handleChange };
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isAutoCompleteControl),
};
</script>
