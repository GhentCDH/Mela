<script setup lang="ts">
import { computed, watch } from 'vue';

import type {
  ColumnDef,
  JsonFormsLayout,
  TextCellType,
} from '@ghentcdh/tools/form';
import { findColumnDef } from '@ghentcdh/tools/form';

import PaginationComponent from './pagination.component.vue';
import { useTableStore } from './table.store';
import BtnIcon from '../button/btn-icon.vue';
import TextCell from './cells/text.cell.vue';
import TableFilter from './filter/table-filter.vue';
import SortHeader from './header/sort.header.vue';
import type { TableAction } from './table.model';

const properties = defineProps<{
  id: string;
  layout: JsonFormsLayout;
  filterLayout?: JsonFormsLayout;
  uri: string;
  reload?: number;
  actions?: TableAction[];
}>();

// TODO add reload functionality!

const emit = defineEmits(['delete', 'edit']);

watch(
  () => properties.reload,
  () => {
    store.reload();
  },
);

let store = useTableStore(properties.id);

watch(
  () => properties.uri,
  (formSchema) => {
    store.init(properties.uri);
  },
  { immediate: true },
);

const edit = (data: unknown) => {
  emit('edit', data);
};

const deleteFn = (data: unknown) => {
  emit('delete', data);
};

const components = {
  TextCell,
};

const displayColumns = computed(() => {
  const { schema, uiSchema } = properties.layout;
  return uiSchema.elements.map((e) => {
    const element = e as TextCellType;
    const def = findColumnDef(element, schema);
    let component: any;
    if (element.options?.format && element.options.format in components) {
      component = components[element.options.format];
    } else {
      component = components[element.type];
    }

    if (!component) console.warn('No component found for type', element.type);

    return {
      ...def,
      component,
    } as ColumnDef & { component: any };
  });
});

const onChangeFilters = (filters: any) => {
  store.updateFilters(filters);
};
</script>

<template>
  <div>
    <div
      v-if="filterLayout"
      class="mb-2"
    >
      <TableFilter
        :layout="filterLayout"
        :filters="store.filters"
        @change-filters="onChangeFilters"
      />
    </div>
    <div>
      <table class="table w-full">
        <thead>
          <tr>
            <th
              v-for="column in displayColumns"
              :key="column.scope"
            >
              <SortHeader
                :store-id="id"
                :column="column"
              />
            </th>
            <th v-if="actions">
              actions
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-if="store.loading">
            <td
              :colspan="displayColumns.length + 1"
              class="text-center"
            >
              <span class="loading loading-bars loading-xs" />
            </td>
          </tr>
          <tr
            v-for="data in store.data?.data"
            :key="data.id"
          >
            <td
              v-for="column in displayColumns"
              :key="column.scope"
            >
              <component
                :is="column.component"
                :v-bind="column"
                :data="data"
                :column="column"
              />
            </td>
            <td v-if="actions">
              <button
                v-for="action of actions"
                :key="action.label"
                class="btn btn-outline btn-sm p-1"
                type="button"
                @click="action.action(data)"
              >
                {{ action.label }}
              </button>
            </td>
            <td>
              <span class="flex gap-2">
                <BtnIcon
                  icon="Edit"
                  :outline="true"
                  @click="edit(data)"
                />
                <BtnIcon
                  icon="Delete"
                  :outline="true"
                  @click="deleteFn(data)"
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <hr class="pb-4">
      <PaginationComponent
        :total-items="store.data?.request.count"
        :items-per-page="store.data?.request.pageSize"
        :current-page="store.data?.request.page"
        @update-page="store.updatePage"
      />
    </div>
  </div>
</template>
