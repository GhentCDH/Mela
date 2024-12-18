<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';

import FormComponent from './form.component.vue';
import { useFormStore } from './form.store';
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
const formData = shallowRef({});

const store = useFormStore(properties.id);
onMounted(() => {
  store.init(properties.urlSchema);
});

const activeId = shallowRef<string | null>(null);

const save = () => {
  store.save(activeId.value, formData.value).then(() => {
    formData.value = null;
    activeId.value = null;
    reload.value = Date.now();
  });
};

const edit = (data: Data) => {
  formData.value = data;
  activeId.value = data.id;
};

const onValid = (v: boolean) => {
  valid.value = v;
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
      <FormComponent
        id="ud"
        v-model="formData"
        :schema="store.formSchema"
        :uischema="store.uiSchema"
        @valid="onValid($event)"
      />
      <div class="card-actions flex justify-end">
        <button
          :disabled="!valid"
          class="btn btn-primary"
          @click="save"
        >
          Save
        </button>
      </div>
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
