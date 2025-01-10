<template>
  <div class="">
    <modal-form
      icon="Funnel"
      modal-title="Filter"
      button-label="Filter"
      :schema="layout.schema"
      :uischema="layout.uiSchema"
      @submit="onSubmit"
    >
      <template #content-before />
      <template #modal-actions>
        <Btn @click="onResetFilters"> Reset all filters</Btn>
      </template>
    </modal-form>

    <BtnBadge icon="Close">{{ filters }}</BtnBadge>
    <button class="badge badge-xs">
      {{ filters }}
      987,654
    </button>
  </div>
</template>

<script setup lang="ts">
import { JsonFormsLayout } from '@ghentcdh/tools/form';

import { Btn } from '../../button';
import { SubmitFormEvent } from '../../form/form.component.vue';
import ModalForm from '../../form/modal/modal-form.vue';
import { BtnBadge } from '@ghentcdh/ui';

defineProps<{
  layout: JsonFormsLayout;
  filters: string[];
}>();

const emits = defineEmits(['changeFilters']);

const onSubmit = (event: SubmitFormEvent) => {
  emits('changeFilters', event.data);
};

const onResetFilters = () => {
  emits('changeFilters', {});

  // TODO closemodal on reset
};
</script>
