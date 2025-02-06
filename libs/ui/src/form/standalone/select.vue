<template>
  <ControlWrapper v-bind="properties">
    <select
      :disabled="!enabled"
      :class="[`select select-bordered`, styles.control.select]"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      v-model="model"
    >
      <option v-for="option in options" :key="option[valueKey]" :value="option">
        {{ option[labelKey] }}
      </option>
    </select>
  </ControlWrapper>
</template>

<script lang="ts" setup>
import ControlWrapper from './ControlWrapper.vue';
import { SelectControl } from './properties';
import type { ControlEmits } from './emits';

const properties = defineProps(SelectControl);

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
