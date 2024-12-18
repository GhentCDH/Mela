<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue';
import { onMounted, ref } from 'vue';

import { useFormStore } from './form.store';
import { tailwindRenderers } from './renderes';
import TableComponent from '../table/table.component.vue';

type Data = {
  [key: string]: any;
};

const properties = defineProps<{
  id: string;
  urlSchema: string;
  createTitle: string;
  updateTitle?: string;
}>();
const valid = ref(false);
const reload = ref(0);

const store = useFormStore(properties.id);
onMounted(() => {
  store.init(properties.urlSchema);
});

const formData = ref<Data>({});
const activeId = ref<string | null>(null);

const onChange = (event: Data) => {
  formData.value = event.data;
  valid.value = event.errors.length === 0;
};

const save = (event: Data) => {
  event.preventDefault();

  store.save(activeId.value, formData.value).then(() => {
    clear();
    reload.value = Date.now();
  });
};

const clear = () => {
  formData.value = {};
  activeId.value = null;
};

const edit = (data: Data) => {
  formData.value = data;
  activeId.value = data.id;
};

const deleteFn = (data: Data) => {
  // TODO add warning
  store.delete(data).then(() => (reload.value = Date.now()));
};
</script>

<template>
  <div class="card bg-base-100 w-full shadow border-2">
    <div
      v-if="store.formSchema && store.uiSchema"
      class="card-body"
    >
      <h1 class="card-title">
        {{ activeId ? updateTitle : createTitle }}
      </h1>
      <form
        :id="id"
        @submit="save"
      >
        <json-forms
          :data="formData"
          :schema="store.formSchema"
          :uischema="store.uiSchema"
          :renderers="tailwindRenderers"
          @change="onChange"
        />
        <div class="card-actions justify-end">
          <button
            type="submit"
            :disabled="!valid"
            class="btn btn-primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>

  <div
    v-if="store.columnSchema"
    class="card bg-base-100 w-full shadow border-2"
  >
    <div class="card-body">
      <h1 class="card-title">
        Data
      </h1>
      <TableComponent
        v-if="store.uri"
        :id="`form_table${id}`"
        :columns="store.columnSchema?.columns"
        :uri="store.uri"
        :reload="reload"
        @edit="edit"
        @delete="deleteFn"
      />
    </div>
  </div>
</template>
