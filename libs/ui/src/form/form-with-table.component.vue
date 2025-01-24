<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue';

import type { FormSchemaModel } from '@ghentcdh/tools/form';

import { useFormStore } from './form.store';
import TableComponent from '../table/table.component.vue';
import type { TableAction } from '../table/table.model';
import ModalForm from './modal/modal-form.vue';

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

const edit = (data: Data) => {
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
        :modal-title="formData.id ? updateTitle : createTitle"
        button-label="Add new record"
        button-save-label="Save"
        icon="Plus"
        :schema="formSchema.form.schema"
        :uischema="formSchema.form.uiSchema"
        @close-modal="onCloseModal"
        @submit="onSuccess"
      />
    </div>
  </div>

  <div
    v-if="formSchema.table"
    class="card w-full xs border-2"
  >
    <div class="p-4">
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
    </div>
  </div>
</template>
