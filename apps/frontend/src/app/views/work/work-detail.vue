<template>
  <div class="m-auto max-w-2xl w-2xl p-2 flex gap-2 flex-col overflow-auto">
    <Loading :loading="!formData" />
    <FormWithActions
      v-if="formData"
      :id="`${formId}`"
      v-model="formData"
      create-title="Work Details"
      :form-schema="formSchema.schema"
      @success="updateWork"
    />
    <Collapse title="Sections">
      <template #list>
        <CollapseRow v-if="workStore.sections.length < 0">
          <div class="list-col-grow">
            <Alert
              message="No sections defined yet"
              type="info"
            />
          </div>
        </CollapseRow>
        <CollapseRow
          v-for="(section, index) in workStore.sections"
          :key="section.id"
        >
          <div class="flex">
            <Btn
              tootip="Move section up"
              color="blank"
              :icon="IconEnum.ChevronUp"
              :outline="true"
              :disabled="index === 0"
              @click="workStore.moveSection(section, index - 1)"
            />
            <Btn
              color="blank"
              tootip="Move section up"
              :icon="IconEnum.ChevronDown"
              :outline="true"
              :disabled="index === workStore.sections.length - 1"
              @click="workStore.moveSection(section, index + 1)"
            />
          </div>
          <div class="text-xl font-thin opacity-30 tabular-nums">
            {{ section.section_number }} ({{ section.section_order }})
          </div>
          <div class="list-col-grow">
            <div>{{ section.title }}</div>
          </div>
          <div class="flex gap-2">
            <Btn
              :icon="IconEnum.Edit"
              :outline="true"
              @click="workStore.editSection(section)"
            >
              Edit
            </Btn>
            <Btn
              :icon="IconEnum.Edit"
              :disabled="section.section_text.length < 1"
              :outline="true"
              @click="workStore.editAnnotations(section)"
            >
              Annotations
            </Btn>
            <Btn
              :icon="IconEnum.Delete"
              :outline="true"
              :disabled="section.section_text.length > 0"
              @click="workStore.deleteSection(section)"
            >
              Delete
            </Btn>
          </div>
        </CollapseRow>
        <CollapseRow>
          <Btn
            :icon="IconEnum.Plus"
            :disabled="!workStore.work?.id"
            @click="workStore.createSection()"
          >
            Create section
          </Btn>
        </CollapseRow>
      </template>
    </Collapse>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Alert, Btn, Collapse, CollapseRow, IconEnum } from '@ghentcdh/ui';
import { FormWithActions } from '@ghentcdh/json-forms-vue';

import { useWorkMenu } from './work-menu.store';
import { useWorkStore } from './work.store';
import { WorkFormSchema } from '@mela/text/shared';
import Loading from '../../ui/loading.vue';

const formId = 'work-index';

const formData = ref(null);
const formSchema = WorkFormSchema;

const workStore = useWorkStore();
const workMenuStore = useWorkMenu();

onMounted(() => {
  workMenuStore.resetMenu();
  workMenuStore.resetBreadcrumbs();
});

watch(
  () => workStore.work,
  () => {
    const data = workStore.work;

    if (!data || !data.id) formData.value = {};
    else formData.value = formSchema.dtoSchema.parse(workStore.work);
  },
  { immediate: true },
);

const updateWork = () => {
  workStore.reload();
};
</script>
