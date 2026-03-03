import { defineStore } from 'pinia';
import { computed } from 'vue';

import type { WorkWithRelations } from '@mela/generated-types';
import { useWorkRepository } from '../../repository/work.repository';
import { DataStore } from '../../repository/data.store';

export const useWorkStore = defineStore('workStore', () => {
  // const params = useRouteParams();
  const workRepository = useWorkRepository();
  const workDataStore = new DataStore<WorkWithRelations, WorkWithRelations>({
    get: (id) => workRepository.get(id),
  });

  const work = computed(() => workDataStore.data.value);

  const sections = computed(() => work.value?.section ?? []);

  const deleteSection = async (sectionId: string) => {
    alert('delete section not implemented');
  };

  return {
    work,
    sections,
    deleteSection,
    reloadWork: () => workDataStore.reload(),
  };
});
