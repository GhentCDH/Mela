<template>
  <Collapse title="Work" :opened="workOpen">
    <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm p-2">
      <dt class="opacity-50">Title</dt>
      <dd>{{ workStore.work?.title }}</dd>
      <dt class="opacity-50">Author</dt>
      <dd>{{ workStore.work?.author?.name }}</dd>
      <dt class="opacity-50">Year</dt>
      <dd>{{ workStore.work?.year }}</dd>
    </dl>
    <div class="flex justify-end p-2 pt-0">
      <Btn
        :icon="IconEnum.Edit"
        :outline="true"
        size="xs"
        @click="workStore.editWork()"
      >
        Edit
      </Btn>
    </div>
  </Collapse>
  <Collapse
    v-if="activeSection"
    title="Active Section"
    :opened="activeSectionOpen"
  >
    <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm p-2">
      <dt class="opacity-50">Number</dt>
      <dd>{{ activeSection.section_number }}</dd>
      <dt class="opacity-50">Title</dt>
      <dd>{{ activeSection.title }}</dd>
      <dt class="opacity-50">Texts</dt>
      <dd>{{ activeSection.section_text?.length ?? 0 }}</dd>
    </dl>
    <div class="flex justify-end gap-1 p-2 pt-0">
      <Btn
        :icon="IconEnum.Edit"
        :outline="true"
        size="xs"
        tooltip="Edit Section"
        @click="workStore.editSection(activeSection)"
      >
        Edit
      </Btn>
      <Btn
        :icon="IconEnum.Text"
        :outline="true"
        size="xs"
        tooltip="Edit annotations"
        :disabled="activeSection.section_text?.length < 1"
        @click="workStore.editAnnotations(activeSection)"
      >
        Annotations
      </Btn>
    </div>
  </Collapse>
  <Collapse title="Sections" :opened="sectionsOpen">
    <ul class="menu menu-sm gap-1 w-full p-0">
      <li v-for="section in visibleSections" :key="section.id">
        <div
          class="flex items-center justify-between w-full gap-2"
          :class="{
            'bg-primary/5 border-b border-primary/60':
              section.id === routeParams.sectionId,
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
              :outline="true"
              size="xs"
              tooltip="Edit Section"
              @click="workStore.editSection(section)"
            />
            <Btn
              :icon="IconEnum.Text"
              :outline="true"
              size="xs"
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

import { Btn, Collapse, IconEnum } from '@ghentcdh/ui';
import { useRouteParams } from '../../../utils/useRouteParams';
import { useWorkStore } from '../work.store';
import { SectionsMenuProperties } from './SectionsMenu.properties';

defineProps(SectionsMenuProperties);

const MAX_VISIBLE = 5;

const routeParams = useRouteParams();
const workStore = useWorkStore();
const showAll = ref(false);

const activeSection = computed(() =>
  workStore.sections.find((s) => s.id === routeParams.sectionId),
);

const visibleSections = computed(() => {
  if (showAll.value) return workStore.sections;
  return workStore.sections.slice(0, MAX_VISIBLE);
});
</script>
