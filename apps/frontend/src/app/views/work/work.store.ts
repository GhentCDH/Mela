import { defineStore } from 'pinia';
import { computed } from 'vue';

import type { Section, WorkWithRelations } from '@mela/generated-types';
import { useWorkRepository } from '../../repository/work.repository';
import { useSectionRepository } from '../../repository/section.repository';
import { DataStore } from '../../repository/data.store';
import { getRouteParam } from '../../utils/useRouteParams';
import { NEW_SECTION_ID, NEW_WORK_ID } from '../../utils/create-section';
import router from '../../../router';

export const useWorkStore = defineStore('workStore', () => {
  const routerParams = getRouteParam();

  const workRepository = useWorkRepository();
  const sectionRepository = useSectionRepository();
  const workDataStore = new DataStore<WorkWithRelations, WorkWithRelations>({
    get: (id) => {
      if (id === NEW_WORK_ID) return Promise.resolve({});
      return workRepository.get(id);
    },
  });

  const work = computed(() => workDataStore.data.value);

  const sections = computed(
    () =>
      work.value?.section?.sort((a, b) => a.section_order - b.section_order) ??
      [],
  );

  const deleteSection = async (section: Section) => {
    alert('delete section not implemented');
  };

  routerParams.watch('workId', (id) => {
    workDataStore.setId(id as string);
  });

  const editWork = () => {
    router.push({
      name: 'work-detail',
      params: { workId: work.value?.id },
    });
  };

  const createSection = () => {
    editSection({ id: NEW_SECTION_ID } as Section);
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

  const moveSection = async (section: Section, newIndex: number) => {
    console.log('move section', section, newIndex);
    if (newIndex < 0 || newIndex >= sections.value.length) return;

    await sectionRepository.moveSection(section.id, newIndex);

    workDataStore.reload();
  };

  return {
    work,
    sections,
    deleteSection,
    moveSection,
    reload: () => workDataStore.reload(),
    editWork,
    editSection,
    editAnnotations,
    createSection,
  };
});
