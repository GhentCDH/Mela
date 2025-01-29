<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
  >
    <input
      :id="control.id + '-input'"
      v-model="query"
      autocomplete="off"
      type="text"
      :class="inputClass"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @focus="onFocus"
      @blur="onBlur"
    >
  </control-wrapper>
  <div v-click-outside="() => (results = [])">
    <ul
      v-if="results.length"
      :class="[
        `bg-base-100 w-52 shadow -mt-5
        absolute`,
      ]"
    >
      <li
        v-for="(result, index) in results"
        :key="result[field.id]"
      >
        <button
          class="w-full h-8 border-b-1 border-gray-200 border-x-0 border-t-0 px-4 py-2 text-left hover:bg-primary-content cursor-pointer"
          type="button"
          @click="selectResult(result)"
          @blur="leaveResult(index)"
        >
          {{ result[field.label] }}
        </button>
      </li>
    </ul>
  </div>
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

import { isAutoCompleteControl } from '../../tester';
import ControlWrapper from '../ControlWrapper.vue';
import { inputClasses } from '../utils/style';
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

    const results = ref<any[]>([]);
    const field = control.appliedOptions.value.field;
    const initialValue = control.control.value.data ?? undefined;

    const query = ref(initialValue?.[field.label] ?? '');
    const open = ref(false);
    const selectValue = ref(false);

    const selectResult = (result: any) => {
      selectValue.value = true;
      handleChange(result);
    };

    const handleChange = (result: any) => {
      const { path } = control.control.value;
      control.handleChange(path, result);
    };
    const close = () => {
      open.value = false;
    };
    const leaveResult = (index: number) => {
      if (results.value?.length === index + 1) results.value = [];
    };

    return {
      ...control,
      results,
      query,
      selectValue,
      field,
      selectResult,
      handleChange,
      open,
      close,
      leaveResult,
    };
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

      this.open = true;
      //Option to allow new values
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
