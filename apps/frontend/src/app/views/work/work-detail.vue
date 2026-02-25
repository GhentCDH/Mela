<template>
  <div class="m-auto max-w-lg p-2">
    <ul class="list bg-base-100 rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Chapters
      </li>
      <li
        v-for="section in workStore.sections"
        :key="section.id"
        class="list-row items-center"
      >
        <div class="text-xl font-thin opacity-30 tabular-nums">
          {{ section.section_number }}
        </div>
        <div class="list-col-grow">
          <div>{{ section.name }}</div>
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
            :outline="true"
            @click="editAnnotations(section)"
          >
            Annotations
          </Btn>
        </div>
      </li>
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">
        <Btn
          :icon="IconEnum.Plus"
          @click="createChapter"
        >
          Create section
        </Btn>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

import { Btn, IconEnum } from '@ghentcdh/ui';

import { useWorkMenu } from './work-menu.store';
import { NEW_SECTION_ID, useWorkStore } from './work.store';
import router from '../../../router';

const workStore = useWorkStore();
const workMenuStore = useWorkMenu();

const editChapter = (section: any) => {
  router.push({
    name: 'section-detail',
    params: { sectionId: section.id, workId: workStore.work.id },
  });
};
const editAnnotations = (section: any) => {
  router.push({
    name: 'text-index-annotate',
    params: {
      sectionId: section.id,
      workId: workStore.work.id,
      textId: section.text[0].id,
    },
  });
};

onMounted(() => {
  workMenuStore.resetMenu();
  workMenuStore.resetBreadcrumbs();
});

const createChapter = () => {
  editChapter({ id: NEW_SECTION_ID });
};
</script>
