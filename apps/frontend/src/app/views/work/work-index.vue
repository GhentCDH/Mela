<script setup lang="ts">
import { WorkFormSchema } from '@mela/text/shared';
import { useRouter } from 'vue-router';

import { TableComponent } from '@ghentcdh/json-forms-vue';
import type { Work } from '@mela/generated-types';
import { Btn, Card, IconEnum } from '@ghentcdh/ui';
import { NEW_WORK_ID } from '../../utils/create-section';

const formId = 'work-index';

const formSchema = WorkFormSchema.schema;
const router = useRouter();

const openWork = (data: Work) => {
  router.push({
    name: 'work-detail',
    params: { workId: data.id },
  });
};
const createWork = () => {
  router.push({
    name: 'work-detail',
    params: { workId: NEW_WORK_ID },
  });
};
</script>

<template>
  <div class="max-w-screen-lg m-auto p-4">
    <div class="flex justify-between items-center mb-2">
      <h1>Works</h1>
      <div>
        <Btn
          :icon="IconEnum.Plus"
          :outline="true"
          @click="createWork"
        >
          Add new record
        </Btn>
      </div>
    </div>

    <Card v-if="formSchema.table">
      <TableComponent
        :id="`form_table_work_detail`"
        :layout="formSchema.table"
        :filter-layout="formSchema.filter"
        :uri="formSchema.uri"
        @edit="openWork"
      />
    </Card>
  </div>
</template>
