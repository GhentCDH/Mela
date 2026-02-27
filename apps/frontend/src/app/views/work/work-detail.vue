<template>
  <div class="m-auto max-w-xl w-lg p-2 flex gap-2 flex-col">
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
          v-for="section in workStore.sections"
          :key="section.id"
        >
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
              @click="editChapter(section)"
            >
              Edit
            </Btn>
            <Btn
              :icon="IconEnum.Edit"
              :disabled="section.section_text.length < 1"
              :outline="true"
              @click="editAnnotations(section)"
            >
              Annotations
            </Btn>
            <Btn
              :icon="IconEnum.Delete"
              :outline="true"
              :disabled="section.section_text.length > 0"
              @click="deleteSection(section)"
            >
              Delete
            </Btn>
          </div>
        </CollapseRow>
        <CollapseRow>
          <Btn
            :icon="IconEnum.Plus"
            @click="createChapter"
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
import { Section } from '@mela/generated-types';

import { useWorkMenu } from './work-menu.store';
import { useWorkStore } from './work.store';
import router from '../../../router';
import { WorkFormSchema } from '@mela/text/shared';
import Loading from '../../ui/loading.vue';
import { NEW_SECTION_ID } from '../../utils/create-section';

const formId = 'work-index';

const formData = ref(null);
const formSchema = WorkFormSchema;

const workStore = useWorkStore();
const workMenuStore = useWorkMenu();

const editChapter = (section: any) => {
  router.push({
    name: 'section-detail',
    params: { sectionId: section.id, workId: workStore.work?.id },
  });
};
const editAnnotations = (section: any) => {
  router.push({
    name: 'annotation-editor',
    params: {
      sectionId: section.id,
      workId: workStore.work.id,
    },
  });
};

onMounted(() => {
  workMenuStore.resetMenu();
  workMenuStore.resetBreadcrumbs();
});

const deleteSection = (section: Section) => {
  workStore.deleteSection(section.id);
};

const createChapter = () => {
  editChapter({ id: NEW_SECTION_ID });
};
watch(
  () => workStore.work,
  () => {
    formData.value = workStore.work
      ? formSchema.dtoSchema.parse(workStore.work)
      : null;
  },
  { immediate: true },
);

const updateWork = () => {
  workStore.reloadWork();
};
</script>
