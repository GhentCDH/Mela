<script setup lang="ts">
import { JsonForms } from '@jsonforms/vue';
import { onMounted, ref } from 'vue';

import { useFormStore } from './form.store';
import { tailwindRenderers } from './renderes';
import IconButton from '../button/icon-button.vue';

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

const store = useFormStore(properties.id);
console.log(properties);
onMounted(() => {
  store.init(properties.urlSchema);
});

const formData = ref<Data>({});
const activeId = ref<string | null>(null);

const onChange = (event: Data) => {
  formData.value = event.data;
  console.table(event.errors);
  console.table(event);
  console.log(store.formSchema);
  console.log(store.uiSchema);
  valid.value = event.errors.length === 0;
};

const save = (event: Data) => {
  event.preventDefault();

  store.save(activeId.value, formData.value).then(() => {
    clear();
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
  store.delete(data);
};
</script>

<template>
  <div class="card bg-base-100 w-full shadow border-2">
    <div
      v-if="store.formSchema && store.uiSchema"
      class="card-body"
    >
      <h1 class="card-title">
        {{ createTitle }}
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
      <table class="table w-full">
        <thead>
          <tr>
            <th
              v-for="column in store.columnSchema?.columns"
              :key="column.scope"
            >
              {{ column.label }}
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="data in store.data?.data"
            :key="data.id"
          >
            <td
              v-for="column in store.columnSchema?.columns"
              :key="column.scope"
            >
              {{ data[column.id] }}
            </td>
            <td>
              <IconButton
                icon="Edit"
                class="mr-2"
                @click="edit(data)"
              />
              <IconButton
                icon="Delete"
                @click="deleteFn(data)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
