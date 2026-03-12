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
            <Alert message="No sections defined yet" type="info" />
          </div>
        </CollapseRow>
        <CollapseRow
          v-for="(section, index) in workStore.sections"
          :key="section.id"
          draggable="true"
          :class="{
            'opacity-50': dragIndex === index,
            'border-t-2 border-primary': dragOverIndex === index,
          }"
          @dragstart="onDragStart($event, index)"
          @dragover="onDragOver($event, index)"
          @dragleave="onDragLeave"
          @drop="onDrop($event, index)"
          @dragend="onDragEnd"
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
            {{ section.section_number }}
          </div>
          <div class="list-col-grow">
            <div>{{ section.title }}</div>
          </div>
          <div class="flex gap-2">
            <Btn
              :icon="IconEnum.Edit"
              :outline="true"
              tooltip="Edit section"
              @click="workStore.editSection(section)"
            />
            <Btn
              :icon="IconEnum.Text"
              :disabled="section.section_text.length < 1"
              :outline="true"
              tooltip="Edit annotations"
              @click="workStore.editAnnotations(section)"
            />
            <Btn
              :icon="IconEnum.Delete"
              :outline="true"
              tooltip="Delete section"
              :disabled="section.section_text.length > 0"
              @click="workStore.deleteSection(section)"
            />
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
import { useDragSort } from './composables/useDragSort';
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

const { dragIndex, dragOverIndex, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd } =
  useDragSort((fromIndex, toIndex) => {
    const section = workStore.sections[fromIndex];
    workStore.moveSection(section, toIndex);
  });
</script>
