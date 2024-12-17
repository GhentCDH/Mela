<script setup lang="ts">
import { onMounted, watch } from 'vue';

import { Column } from '@ghentcdh/tools/form';

import PaginationComponent from './pagination.component.vue';
import { useTableStore } from './table.store';
import IconButton from '../button/icon-button.vue';

type Data = {
  [key: string]: any;
};

const properties = defineProps<{
  id: string;
  columns: Column[];
  uri: string;
  reload: number;
}>();

// TODO add reload functionality!

const emit = defineEmits(['delete', 'edit']);

watch(
  () => properties.reload,
  () => {
    store.reload();
  }
);

const store = useTableStore(properties.id);
onMounted(() => {
  store.init(properties.uri);
});

const edit = (data: Data) => {
  emit('edit', data);
};

const deleteFn = (data: Data) => {
  emit('delete', data);
};
</script>

<template>
  <table class="table w-full">
    <thead>
      <tr>
        <th
          v-for="column in columns"
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
          v-for="column in columns"
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
  <hr class="pb-2">
  <PaginationComponent
    :total-items="store.data?.request.count"
    :items-per-page="store.data?.request.pageSize"
    :current-page="store.data?.request.page"
    @update-page="store.updatePage"
  />
</template>
