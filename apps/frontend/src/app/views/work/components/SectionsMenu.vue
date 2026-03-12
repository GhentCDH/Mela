<template>
  <Collapse
    title="Work"
    :opened="workOpen"
    v-if="activeWork"
    :actions="workActions"
  >
    <template #actions>
      <button
        class="btn btn-ghost btn-xs"
        @click="workStore.editWork(activeWork.id)"
      >
        Edit
      </button>
    </template>
    <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm p-2">
      <dt class="opacity-50">Title</dt>
      <dd>{{ workStore.work?.title }}</dd>
      <dt class="opacity-50">Author</dt>
      <dd>{{ workStore.work?.author?.name }}</dd>
      <dt class="opacity-50">Year</dt>
      <dd>{{ workStore.work?.year }}</dd>
    </dl>
  </Collapse>
  <Collapse
    v-if="activeSection"
    title="Active Section"
    :opened="activeSectionOpen"
    :actions="sectionActions"
  >
    <template #actions v-if="!isNewSection">
      <button
        class="btn btn-ghost btn-xs"
        @click="workStore.editSection(activeSection)"
      >
        Edit
      </button>
    </template>
    <template v-if="isNewSection">
      <Alert type="warning"> New section creation in progress </Alert>
    </template>
    <template v-else>
      <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm p-2">
        <dt class="opacity-50">Number</dt>
        <dd>{{ activeSection.section_number }}</dd>
        <dt class="opacity-50">Title</dt>
        <dd>{{ activeSection.title }}</dd>
        <dt class="opacity-50">Texts</dt>
        <dd>{{ activeSection.section_text?.length ?? 0 }}</dd>
      </dl>
    </template>
  </Collapse>
  <Collapse title="Sections" :opened="sectionsOpen">
    <ul class="menu menu-sm gap-1 w-full p-0">
      <li v-for="section in visibleSections" :key="section.id">
        <div
          class="flex items-center justify-between w-full gap-2"
          :class="{
            'bg-primary/5 border-b border-primary/60':
              section.id === activeSection?.id,
          }"
        >
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-sm font-mono opacity-40 tabular-nums">
              {{ section.section_number }}
            </span>
            <span class="truncate">{{ section.title }}</span>
          </div>
          <div class="flex gap-1 shrink-0">
            <Btn
              :icon="IconEnum.Edit"
              color="blank"
              size="xs"
              tooltip="Edit Section"
              @click="workStore.editSection(section)"
            />
            <Btn
              :icon="IconEnum.Text"
              :outline="true"
              size="xs"
              color="blank"
              tooltip="Edit annotations"
              :disabled="section.section_text?.length < 1"
              @click="workStore.editAnnotations(section)"
            />
          </div>
        </div>
      </li>
    </ul>
    <div
      v-if="workStore.sections.length > MAX_VISIBLE"
      class="flex justify-center p-2"
    >
      <Btn :outline="true" size="xs" @click="showAll = !showAll">
        {{ showAll ? 'Show less' : `Show all (${workStore.sections.length})` }}
      </Btn>
    </div>
  </Collapse>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

import { Alert, Btn, Collapse, IconEnum } from '@ghentcdh/ui';
import { useWorkStore } from '../work.store';
import { SectionsMenuProperties } from './SectionsMenu.properties';
import { useSectionStore } from '../section-store';
import { NEW_SECTION_ID } from '../../../utils/create-section';

const props = defineProps(SectionsMenuProperties);

const MAX_VISIBLE = 5;

const workStore = useWorkStore();
const sectionStore = useSectionStore();
const showAll = ref(false);

const activeWork = computed(() => workStore.work);
const activeSection = computed(() => sectionStore.section);

const visibleSections = computed(() => {
  if (showAll.value) return workStore.sections;
  return workStore.sections.slice(0, MAX_VISIBLE);
});

const isNewSection = computed(
  () => sectionStore.section?.id === NEW_SECTION_ID,
);

const workActions = computed(() => {
  const work = activeWork.value;

  if (!work) return [];

  return [{ label: 'Edit', onClick: () => workStore.editWork() }];
});

const sectionActions = computed(() => {
  const section = activeSection.value;

  if (!section || section.id === NEW_SECTION_ID) return [];

  if (props.mode === 'edit')
    return [
      {
        label: 'Annotate',
        onClick: () => workStore.editAnnotations(section),
      },
    ];
  if (props.mode === 'annotate')
    return [{ label: 'Edit', onClick: () => workStore.editSection(section) }];

  return [];
});
</script>
