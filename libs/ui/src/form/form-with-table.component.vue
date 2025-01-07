<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';

import { FormSchemaModel } from '@ghentcdh/tools/form';

import FormWithActions from './form-with-actions.component.vue';
import { useFormStore } from './form.store';
import TableComponent from '../table/table.component.vue';
import { TableAction } from '../table/table.model';

type Data = {
  [key: string]: any;
};

const properties = defineProps<{
  id: string;
  urlSchema: string;
  createTitle: string;
  updateTitle?: string;
  tableActions?: TableAction[];
  formSchema: FormSchemaModel;
}>();
const reload = ref(0);
const formData = shallowRef({});

const store = useFormStore(properties.id);
onMounted(() => {
  store.init(properties.formSchema);
});

const activeId = shallowRef<string | null>(null);

const edit = (data: Data) => {
  formData.value = data;
  activeId.value = data.id;
};

const deleteFn = (data: Data) => {
  // TODO add warning
  store.delete(data).then(() => (reload.value = Date.now()));
};

const onReload = () => {
  reload.value = Date.now();
};

const onSuccess = () => {
  reload.value = Date.now();
  formData.value = {};
  activeId.value = null;
};
</script>

<template>
  <FormWithActions
    :id="id"
    v-model="formData"
    :form-schema="formSchema"
    :create-title="createTitle"
    :update-title="updateTitle"
    @success="onSuccess"
  />
  <div v-if="formSchema.table" class="card bg-base-100 w-full shadow border-2">
    <div class="card-body">
      <h1 class="card-title">Data</h1>
      <TableComponent
        v-if="formSchema.uri"
        :id="`form_table${id}`"
        :layout="formSchema.table"
        :uri="formSchema.uri"
        :reload="reload"
        :actions="tableActions"
        @edit="edit"
        @delete="deleteFn"
      />
    </div>
  </div>
</template>
