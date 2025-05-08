<template>
  <ControlWrapper v-bind="properties">
    <select
      v-model="model"
      :disabled="!enabled"
      :class="[`select select-bordered`, styles.control.select]"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    >
      <option
        v-for="option in options"
        :key="option[valueKey]"
        :value="option"
      >
        {{ option[labelKey] }}
      </option>
    </select>
  </ControlWrapper>
</template>

<script lang="ts" setup>
import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type {
  SelectControlProperties} from './core/properties';
import {
  DefaultControlProperties
} from './core/properties';

const properties = withDefaults(defineProps<SelectControlProperties>(), {
  ...DefaultControlProperties(),
  options: [],
  valueKey: 'value',
  labelKey: 'label',
});

const emit = defineEmits<ControlEmits>();
const model = defineModel();

const onChange = (event: Event) => {
  emit('change', event);
};
const onFocus = (event: FocusEvent) => {
  emit('focus', event);
};
const onBlur = (event: Event) => {
  emit('blur', event);
};
</script>
