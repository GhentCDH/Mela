<template>
  <control-wrapper v-bind="controlWrapper">
    <div class="dropdown dropdown-open">
      <input
        :id="control.id + '-input'"
        v-model="query"
        autocomplete="off"
        type="text"
        :class="[
          'input',
          'input-bordered input-primary w-full max-w-xs',
          { 'input-error': control.errors },
        ]"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="appliedOptions.placeholder"
        @focus="onFocus"
        @blur="onBlur"
      >
      <ul
        v-if="results.length"
        class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li
          v-for="result in results"
          :key="result[field.id]"
        >
          <button
            class="w-full"
            type="button"
            @click="selectResult(result)"
          >
            {{ result[field.label] }}
          </button>
        </li>
      </ul>
    </div>
  </control-wrapper>
</template>

<script lang="ts">
import type {
  ControlElement,
  JsonFormsRendererRegistryEntry,
} from '@jsonforms/core';
import { rankWith } from '@jsonforms/core';
import type { RendererProps } from '@jsonforms/vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { defineComponent, ref } from 'vue';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import type { ResponseData } from '@ghentcdh/tools/form';

import ControlWrapper from '../ControlWrapper.vue';
import { isAutoCompleteControl } from '../tester';
import { useVanillaControlCustom } from '../utils/vanillaControl';

const controlRenderer = defineComponent({
  name: 'AutocompleteControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const control = useVanillaControlCustom(
      useJsonFormsControl(props),
      (target) => target.value ?? undefined,
    );

    const results = ref([]);
    const query = ref('');
    const selectValue = ref(false);

    const field = control.appliedOptions.value.field;

    const selectResult = (result: any) => {
      selectValue.value = true;

      handleChange(result);
    };

    const handleChange = (result: any) => {
      const { path } = control.control.value;
      control.handleChange(path, result);
    };

    return {
      ...control,
      results,
      query,
      selectValue,
      field,
      selectResult,
      handleChange,
    };
  },
  watch: {
    'control.data': function (val) {
      // If there is no id the query is running
      if (val && !val[this.field.id]) return;

      this.selectValue = true;
      this.results = [];
      this.query = val?.[this.field.label] ?? '';
    },
    query: function (query) {
      // If the field is set through the input don't run the query
      if (this.selectValue) {
        this.selectValue = false;
        return;
      }

      // TODO check an option to allow new values
      this.handleChange({ [this.field.label]: query });

      const { uri } = this.appliedOptions;
      useHttpStore()
        .get<ResponseData<any>>(`${uri}${query}`)
        .then((data) => {
          this.results = data.data as [];
        });
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isAutoCompleteControl),
};
</script>
