<template>
  <ControlWrapper v-bind="properties">
    <input
      v-model="query"
      autocomplete="off"
      type="text"
      :class="[styles.control.select]"
      :disabled="!enabled"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div v-click-outside="() => (results = [])">
      <ul
        v-if="results?.length"
        :class="[
          `bg-base-100 w-52 shadow -mt-5
        absolute z-50`,
        ]"
      >
        <li v-for="(result, index) in results" :key="result[valueKey]">
          <button
            class="w-full h-8 border-b-1 border-gray-200 border-x-0 border-t-0 px-4 py-2 text-left hover:bg-primary-content cursor-pointer"
            type="button"
            @click="selectResult(result)"
            @blur="leaveResult(index)"
          >
            {{ getLabel(result) }}
          </button>
        </li>
      </ul>
    </div>
  </ControlWrapper>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import { useHttpRequest } from '@ghentcdh/authentication-vue';
import type { ResponseData } from '@ghentcdh/json-forms/core';

import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type { AutoCompleteProperties } from './core/properties';
import { DefaultAutoCompleteProperties } from './core/properties';

const properties = withDefaults(
  defineProps<AutoCompleteProperties>(),
  DefaultAutoCompleteProperties(),
);

const emit = defineEmits<ControlEmits>();
const model = defineModel();
const query = ref('');

const onChange = (event: Event) => {
  emit('change', event);
};
const onFocus = (event: FocusEvent) => {
  emit('focus', event);
};
const onBlur = (event: Event) => {
  emit('blur', event);
};

const selectValue = ref(false);
const results = ref<any[]>([]);

const selectResult = (result: any) => {
  selectValue.value = true;
  handleChange(result);
};

const handleChange = (result: any) => {
  model.value = result;
  onChange(result);
};

const leaveResult = (index: number) => {
  if (results.value?.length === index + 1) results.value = [];
  // TODO handle the change
};
const httpRequest = useHttpRequest();

const getValueField = (field: any) => field[properties.valueKey];
const getLabel = (field: any) => field?.[properties.labelKey] ?? '';

watch(
  () => model.value,
  (value) => {
    if (value && !getValueField(value)) return;
    selectValue.value = true;
    results.value = [];
    query.value = getLabel(value);
  },
  { immediate: true },
);

watch(
  () => query.value,
  (query) => {
    // If the field is set through the input don't run the query
    if (selectValue.value) {
      selectValue.value = false;
      return;
    }

    //Option to allow new values
    handleChange({ [properties.labelKey]: query });

    if (properties.config) {
      const { uri, skipAuth, dataField } = properties.config;
      httpRequest
        .get<ResponseData<any>>(`${uri}${query}`, { skipAuth })
        .then((data: any) => {
          results.value = data[dataField!] as [];
        });
    } else if (properties.options) {
      results.value = properties.options
        .filter((option: any) => getLabel(option).toLowerCase().includes(query))
        .slice(0, 10);
    }
  },
);
</script>
