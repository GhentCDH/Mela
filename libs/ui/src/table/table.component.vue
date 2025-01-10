<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';

import {
  ColumnDef,
  JsonFormsLayout,
  TextCellType,
  findColumnDef,
} from '@ghentcdh/tools/form';

import PaginationComponent from './pagination.component.vue';
import { useTableStore } from './table.store';
import IconButton from '../button/icon-button.vue';
import TextCell from './cells/text.cell.vue';
import SortHeader from './header/sort.header.vue';
import { TableAction } from './table.model';
import { Btn } from '../button';

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

const store = useTableStore(properties.id);

onMounted(() => {
  store.init(properties.uri);
});

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
</script>

<template>
  <div class="flex flex-col gap-2">
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
              <Btn
                v-for="action of actions"
                :key="action.label"
                :outline="true"
                @click="action.action(data)"
              >
                {{ action.label }}
              </Btn>
            </td>
            <td>
              <span class="flex gap-2">
                <IconButton
                  icon="Edit"
                  :outline="true"
                  @click="edit(data)"
                />
                <IconButton
                  icon="Delete"
                  :outline="true"
                  @click="deleteFn(data)"
                />
              </span>
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
    </div>
  </div>
</template>
