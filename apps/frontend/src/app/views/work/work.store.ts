import { defineStore } from 'pinia';
import { computed, watch } from 'vue';

import type { Section, WorkWithRelations } from '@mela/generated-types';
import { useWorkRepository } from '../../repository/work.repository';
import { DataStore } from '../../repository/data.store';
import { useRouteParams } from '../../utils/useRouteParams';
import { NEW_WORK_ID } from '../../utils/create-section';
import router from '../../../router';

export const useWorkStore = defineStore('workStore', () => {
  const params = useRouteParams();
  const workRepository = useWorkRepository();
  const workDataStore = new DataStore<WorkWithRelations, WorkWithRelations>({
    get: (id) => {
      if (id === NEW_WORK_ID) return Promise.resolve({});
      return workRepository.get(id);
    },
  });

  workDataStore.setId(params.workId);

  const work = computed(() => workDataStore.data.value);

  const sections = computed(() => work.value?.section ?? []);

  const deleteSection = async (sectionId: string) => {
    alert('delete section not implemented');
  };

  watch(params.workId, () => {
    workDataStore.setId(params.workId);
  });

  const editWork = () => {
    router.push({
      name: 'work-detail',
      params: { workId: work.value?.id },
    });
  };

  const editSection = (section: Section) => {
    router.push({
      name: 'section-detail',
      params: { sectionId: section.id, workId: work.value?.id },
    });
  };

  const editAnnotations = (section: Section) => {
    router.push({
      name: 'annotation-editor',
      params: { sectionId: section.id, workId: work.value?.id },
    });
  };

  return {
    work,
    sections,
    deleteSection,
    reload: () => workDataStore.reload(),
    editWork,
    editSection,
    editAnnotations,
  };
});
