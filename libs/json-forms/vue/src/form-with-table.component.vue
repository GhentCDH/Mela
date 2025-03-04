<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue';

import type { FormSchemaModel } from '@ghentcdh/json-forms/core';
import type { TableAction } from '@ghentcdh/ui';
import { Card, IconEnum } from '@ghentcdh/ui';

import { useFormStore } from './form.store';
import ModalForm from './modal/modal-form.vue';
import { TableComponent } from './table';
import { hasCustomEventListener } from '@ghentcdh/ui';

type Data = {
  [key: string]: any;
};

const properties = defineProps<{
  id: string;
  tableTitle: string;
  createTitle: string;
  updateTitle?: string;
  dataUri?: string;
  tableActions?: TableAction[];
  formSchema: FormSchemaModel;
  initialData?: Data;
}>();
const reload = ref(0);
const formData = shallowRef<any>({ ...(properties.initialData ?? {}) });

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

const activeId = shallowRef<string | null>(null);

const modalCompRef = ref(null);
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
  formData.value = data;
  activeId.value = data.id;
  modalCompRef.value?.openModal();
};

const deleteFn = (data: Data) => {
  // TODO add warning
  store.delete(data).then(() => (reload.value = Date.now()));
};

const onReload = () => {
  reload.value = Date.now();
};

const onSuccess = () => {
  store.save(activeId.value, formData.value).then(() => {
    reload.value = Date.now();
  });
};

const onCloseModal = () => {
  formData.value = { ...(properties.initialData ?? {}) };
  activeId.value = null;
};
</script>

<template>
  <div class="flex justify-between items-center mb-2">
    <h1>
      {{ tableTitle }}
    </h1>
    <div>
      <modal-form
        ref="modalCompRef"
        v-model="formData"
        :modal-title="formData.id ? (updateTitle ?? '') : createTitle"
        button-label="Add new record"
        button-save-label="Save"
        :icon="IconEnum.Plus"
        :schema="formSchema.form.schema"
        :uischema="formSchema.form.uiSchema"
        @close-modal="onCloseModal"
        @submit="onSuccess"
      />
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
