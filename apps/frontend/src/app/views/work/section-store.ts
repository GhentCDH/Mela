import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { SectionWithRelations } from '@mela/generated-types';
import { NotificationService } from '@ghentcdh/ui';
import { useSectionRepository } from '../../repository/section.repository';
import { createSectionDto, NEW_SECTION_ID } from '../../utils/create-section';
import { createSourceContent } from './text-index/controls/annotate-text/utils/source';
import { DataStore } from '../../repository/data.store';
import { getRouteParam } from '../../utils/useRouteParams';

export const useSectionStore = defineStore('sectionStore', () => {
  const routerParams = getRouteParam();

  const sectionId = ref('');
  const sectionRepository = useSectionRepository();

  const sectionDataStore = new DataStore<
    SectionWithRelations,
    SectionWithRelations
  >({
    get: (id) => {
      if (id === NEW_SECTION_ID) {
        return Promise.resolve(
          createSectionDto(routerParams.get('workId'), {}),
        );
      }

      return sectionRepository.get(id).then((data) => {
        const workId = routerParams.get('workId');
        if (data.work_id !== workId) {
          NotificationService.error('Section is no part of the work');
          return null;
        }
        return createSectionDto(workId, data);
      });
    },
    items: { create: sectionRepository.create, patch: sectionRepository.patch },
  });

  routerParams.watch('sectionId', (id) => {
    sectionId.value = id as string;
    sectionDataStore.setId(id as string);
  });

  const sources = computed(() => {
    return createSourceContent(sectionDataStore.data.value?.section_text ?? []);
  });

  const saveOrUpdate = (section: SectionWithRelations) => {
    const sectionId = routerParams.get('sectionId');
    return sectionId === NEW_SECTION_ID
      ? sectionDataStore.createItem(section)
      : sectionDataStore.patchItem(sectionId, section);
  };

  return {
    section: computed(() => sectionDataStore.data.value),
    sectionId,
    saveOrUpdate,
    sources,
    reload: () => sectionDataStore.reload(),
  };
});
