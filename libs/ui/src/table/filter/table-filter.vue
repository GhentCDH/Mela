<template>
  <div class="">
    <div class="flex gap-2 items-center mb-2">
      <modal-form
        icon="Funnel"
        modal-title="Filter"
        button-label="Filter"
        v-model="formData"
        :schema="layout.schema"
        :uischema="layout.uiSchema"
        @submit="onSubmit"
      >
        <template #content-before />
        <template #modal-actions></template>
      </modal-form>
      <template v-if="filters.length">
        <Btn size="xs" @click="onResetFilters" :outline="true">
          Reset all filters
        </Btn>
      </template>
    </div>
    <div class="flex gap-2">
      <BtnBadge
        v-for="filter in filters"
        icon="Close"
        @click="removeFilter(filter)"
      >
        {{ filter.label }}: {{ filter.value }}
      </BtnBadge>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Filter, JsonFormsLayout } from '@ghentcdh/tools/form';

import { Btn } from '../../button';
import ModalForm from '../../form/modal/modal-form.vue';
import { BtnBadge } from '@ghentcdh/ui';
import { ref, watch } from 'vue';

const formData = ref();

const properties = defineProps<{
  layout: JsonFormsLayout;
  filters: Filter[];
}>();

const emits = defineEmits<{
  changeFilters: [data: any];
  removeFilter: [filter: Filter];
}>();

watch(
  () => properties.filters,
  (first, second) => {
    formData.value = {};
    properties.filters.forEach((filter) => {
      // TODO on multiple values
      formData.value[filter.key] = filter.value;
    });
  },
  { immediate: true },
);

const onSubmit = () => {
  emits('changeFilters', formData.value);
};

const onResetFilters = () => {
  emits('changeFilters', {});

  // TODO closemodal on reset
};

const removeFilter = (filter: Filter) => {
  // TODO on multiple values
  formData.value[filter.key] = undefined;

  emits('changeFilters', formData.value);
};
</script>
