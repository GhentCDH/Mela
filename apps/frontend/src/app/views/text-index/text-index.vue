<script setup lang="ts">
import { TextFormSchema } from '@mela/text/shared';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type { Text } from '@ghentcdh/mela/generated/types';
import type { TableAction } from '@ghentcdh/ui';
import { Btn, IconEnum, useFormStore } from '@ghentcdh/ui';

import TableComponent from '../../../../../../libs/ui/src/table/table.component.vue';

const formId = 'text-index';
const urlSchema = '/api/text/schema';
const router = useRouter();

const tableActions: TableAction[] = [
  {
    label: 'Phrases',
    action: (data: Text) => {
      router.replace({
        name: 'text-index-phrase',
        params: { textId: data.id },
      });
    },
  },
];

let store = useFormStore(formId);
const formSchema = TextFormSchema.schema;
const reload = ref(0);

const edit = (data: { id: string }) => {
  router.replace({
    name: 'text-index-detail',
    params: { textId: data?.id ?? 'new' },
  });
};

const deleteFn = (data: { id: string }) => {
  // TODO add warning
  store.delete(data).then(() => (reload.value = Date.now()));
};
</script>

<template>
  <div class="max-w-screen-lg m-auto">
    <div class="flex justify-between items-center mb-2">
      <h1>Texts</h1>
      <Btn
        :icon="IconEnum.Plus"
        :outline="true"
        @click="edit"
      >
        Add text
      </Btn>
    </div>
    <div
      v-if="formSchema.table"
      class="card w-full xs border-2"
    >
      <div class="p-4">
        <TableComponent
          v-if="formSchema.uri"
          :id="`form_table_${formId}`"
          :layout="formSchema.table"
          :filter-layout="formSchema.filter"
          :uri="formSchema.uri"
          :actions="tableActions"
          @edit="edit"
          @delete="deleteFn"
        />
      </div>
    </div>
  </div>
</template>
