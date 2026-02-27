import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import type { WorkWithRelations } from '@mela/generated-types';
import { useWorkRepository } from '../../repository/work.repository';
import { ReloadRef } from './text-index/controls/annotate-text/utils/reload';
import { useSectionRepository } from '../../repository/section.repository';

export const useWorkStore = defineStore('workStore', () => {
  const route = useRoute();
  const workRepository = useWorkRepository();
  const sectionRepository = useSectionRepository();

  const workId = ref(route.params.workId as string);

  watch(
    () => route.params.workId,
    (newId, oldId) => {
      if (newId !== oldId) workId.value = newId as string;
    },
  );
  const sections = computed(() => work.value?.section ?? []);

  const reload = ReloadRef();

  const work = computedAsync(() => {
    const wait = reload.watchReload;
    if (!workId.value) return null;

    return workRepository.get(workId.value) as Promise<WorkWithRelations>;
  });

  const reloadWork = () => {
    reload.reload();
  };

  const deleteSection = async (sectionId: string) => {
    sectionRepository.delete(sectionId).then(() => {
      reload.reload();
    });
  };

  return {
    work,
    sections,
    deleteSection,
    reloadWork,
  };
});
