<template>
  <ControlWrapper v-bind="properties">
    <button
      type="button"
      :class="[styles.control.select, 'w-full truncate block']"
      @click="toggle"
    >
      {{ model?.map?.((m) => getLabel(m)).join(', ') ?? 'Select value' }}
    </button>
    <div v-click-outside="() => close()">
      <ul
        v-if="displayValues"
        :class="[
          `bg-base-100 w-52 shadow -mt-5
        absolute z-50`,
        ]"
      >
        <li
          v-for="result in options"
          :key="result[valueKey]"
        >
          <button
            class="w-full flex h-8 border-b-1 border-gray-200 border-x-0 border-t-0 px-2 py-2 text-left hover:bg-primary-content cursor-pointer"
            type="button"
            @click="selectResult(result)"
            @blur="displayValues = false"
          >
            <div class="w-4 mr-2">
              <Icon
                v-if="hasKey(getValueField(result))"
                :icon="IconEnum.Check"
                :size="Size.sm"
              />
            </div>
            {{ getLabel(result) }}
          </button>
        </li>
      </ul>
    </div>
  </ControlWrapper>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { Size } from '../const';
import { Icon, IconEnum } from '../icons';
import ControlWrapper from './core/ControlWrapper.vue';
import type { ControlEmits } from './core/emits';
import type { SelectControlProperties } from './core/properties';
import { DefaultSelectProperties } from './core/properties';

const properties = withDefaults(
  defineProps<SelectControlProperties>(),
  DefaultSelectProperties(),
);

const emit = defineEmits<ControlEmits>();
const model = defineModel<any[]>();

let justToggle = false;

const onChange = (event: Event) => {
  emit('change', event);
};
const onFocus = (event: FocusEvent) => {
  emit('focus', event);
};
const onBlur = (event: Event) => {
  emit('blur', event);
};

const displayValues = ref(false);

const toggle = () => {
  displayValues.value = !displayValues.value;
  justToggle = true;
};

const close = () => {
  if (!justToggle) {
    displayValues.value = false;
  }
  justToggle = false;
};

const selectedIds = computed(
  () => model.value?.map((m) => getValueField(m)) ?? [],
);

const hasKey = (field: any) => selectedIds.value.includes(field);

const selectResult = (result: any) => {
  let selection: any[] = model.value ?? [];

  const value = getValueField(result);
  const hasValue = hasKey(value);

  if (hasValue) selection = selection.filter((s) => getValueField(s) !== value);
  else selection.push(result);

  model.value = selection;
  onChange(selection as any);
};

const getValueField = (field: any) => field[properties.valueKey];
const getLabel = (field: any) => field?.[properties.labelKey] ?? '';
</script>
