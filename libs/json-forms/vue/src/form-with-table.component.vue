<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import type { FormSchemaModel } from '@ghentcdh/json-forms/core';
import type { TableAction } from '@ghentcdh/ui';
import {
  Btn,
  Card,
  hasCustomEventListener,
  IconEnum,
  ModalService,
} from '@ghentcdh/ui';

import { FormModal } from './index';

import { useFormStore } from './form.store';
import type { FormModalProps, FormModalResult } from './modal/form-modal.props';
import { TableComponent } from './table';

type Data = {
  [key: string]: any;
};

const properties = withDefaults(
  defineProps<{
    id: string;
    tableTitle: string;
    createTitle: string;
    updateTitle?: string;
    dataUri?: string;
    tableActions?: TableAction[];
    formSchema: FormSchemaModel;
    initialData?: Data;
  }>(),
  { initialData: {} as Data },
);
const reload = ref(0);

let store = useFormStore(properties.id);
onMounted(() => {
  store.init(properties.formSchema);
});

watch(
  () => properties.formSchema,
  (formSchema) => {
    store.init(formSchema);
  },
);
const emit = defineEmits<{
  editData: [Data];
}>();

const hasEdit = hasCustomEventListener('editData');

const edit = (data: Data) => {
  console.log('edit', hasEdit);
  if (hasEdit) {
    emit('editData', data);
    return;
  }
  openModal(data);
};

const deleteFn = (data: Data) => {
  ModalService.showConfirm({
    title: 'Delete annotation',
    message: 'Are you sure to delete, the data will be lost?',
    onClose: (result) => {
      if (result.confirmed) {
        store.delete(data).then(() => (reload.value = Date.now()));
      }
    },
  });
};

const openModal = (formData?: any) => {
  ModalService.openModal<FormModalProps, any>({
    component: FormModal,
    props: {
      formSchema: properties.formSchema.form,
      data: formData ?? properties.initialData,
      modalTitle: formData?.id
        ? (properties.updateTitle ?? '')
        : properties.createTitle,
      onClose: (result: FormModalResult) => {
        if (result && result.valid) {
          store.save(formData?.id, result.data).then(() => {
            reload.value = Date.now();
          });
        }
      },
    },
  });
};
</script>

<template>
  <div class="flex justify-between items-center mb-2">
    <h1>
      {{ tableTitle }}
    </h1>
    <div>
      <Btn :icon="IconEnum.Plus" :outline="true" @click="openModal">
        Add new record
      </Btn>
    </div>
  </div>

  <Card v-if="formSchema.table">
    <TableComponent
      v-if="formSchema.uri"
      :id="`form_table_${id}`"
      :layout="formSchema.table"
      :filter-layout="formSchema.filter"
      :uri="dataUri ?? formSchema.uri"
      :reload="reload"
      :actions="tableActions"
      @edit="edit"
      @delete="deleteFn"
    />
  </Card>
</template>
