<script setup lang="ts">
import type { ColumnDef } from '@ghentcdh/json-forms/core';

import TextCell from './cells/text.cell.vue';
import type { DisplayColumn, TableAction } from './table.model';
import Btn from '../button/btn.vue';
import { IconEnum } from '../icons';
import SortHeader from './header/sort.header.vue';
import PaginationComponent from './pagination.component.vue';

const properties = defineProps<{
  loading?: boolean;
  actions?: TableAction[];
  data?: any[];
  displayColumns: Array<DisplayColumn>;
  page?: {
    count: number;
    pageSize: number;
    page: number;
  };
  sort?: {
    sortColumn: string;
    sortDirection: 'asc' | 'desc';
  };
}>();

// TODO add reload functionality!

const emits = defineEmits<{
  delete: [data: any];
  edit: [data: any];
  updatePage: [page: number];
  sort: [id: string];
}>();

const edit = (data: unknown) => {
  emits('edit', data);
};

const deleteFn = (data: unknown) => {
  emits('delete', data);
};

const onUpdatePage = (page: number) => {
  emits('updatePage', page);
};

const onSort = (id: string) => {
  emits('sort', id);
};

const components = {
  TextCell,
};
</script>

<template>
  <table class="table w-full">
    <thead>
      <tr>
        <th
          v-for="column in displayColumns"
          :key="column.scope"
        >
          <SortHeader
            :column="column"
            v-bind="sort"
            @sort="onSort"
          />
        </th>
        <th v-if="actions">
          actions
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td
          :colspan="displayColumns.length + 1"
          class="text-center"
        >
          <span class="loading loading-bars loading-xs" />
        </td>
      </tr>
      <tr
        v-for="item in data"
        :key="item.id"
      >
        <td
          v-for="column in displayColumns"
          :key="column.scope"
        >
          <component
            :is="column.component"
            :v-bind="column"
            :data="item"
            :column="column"
          />
        </td>
        <td v-if="actions">
          <button
            v-for="action of actions"
            :key="action.label"
            class="btn btn-outline btn-sm p-1"
            type="button"
            @click="action.action(item)"
          >
            {{ action.label }}
          </button>
        </td>
        <td>
          <span class="flex gap-2">
            <Btn
              :icon="IconEnum.Edit"
              :outline="true"
              @click="edit(item)"
            />
            <Btn
              :icon="IconEnum.Delete"
              :outline="true"
              @click="deleteFn(item)"
            />
          </span>
        </td>
      </tr>
    </tbody>
  </table>
  <template v-if="page">
    <PaginationComponent
      class="border-gray-300 border-t pt-4 border-x-0 border-b-0"
      :total-items="page.count"
      :items-per-page="page.pageSize"
      :current-page="page.page"
      @update-page="onUpdatePage"
    />
  </template>
</template>
