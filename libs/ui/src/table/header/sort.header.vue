<template>
  <button
    class="flex"
    @click="sort"
  >
    <span class="items-center flex-grow pr-2"> {{ column.label }}</span>
    <div class="h-4 w-4">
      <Icon
        v-if="store.sortColumn === sortId"
        :icon="sortIcon"
      />
    </div>
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue';

import type { ColumnDef } from '@ghentcdh/tools/form';

import type { IconDef } from '../../icons';
import { Icon } from '../../icons';
import { useTableStore } from '../table.store';

const { column, storeId } = defineProps<{
  column: ColumnDef;
  storeId: string;
}>();
const store = useTableStore(storeId);

const sortIcon = computed<IconDef>(() =>
  store.sortDirection === 'asc' ? 'BarsArrowUp' : 'BarsArrowDown',
);

const sortId = computed(() => column.options?.sortId ?? column.id);

const sort = () => {
  store.sort(sortId.value);
};
</script>
