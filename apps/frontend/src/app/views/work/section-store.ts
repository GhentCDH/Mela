import { defineStore } from 'pinia';
import { computed } from 'vue';

import type { SectionWithRelations } from '@mela/generated-types';
import { NotificationService } from '@ghentcdh/ui';
import { useSectionRepository } from '../../repository/section.repository';
import { createSectionDto, NEW_SECTION_ID } from '../../utils/create-section';
import { createSourceContent } from './text-index/controls/annotate-text/utils/source';
import { DataStore } from '../../repository/data.store';
import { useRouteParams } from '../../utils/useRouteParams';

export const useSectionStore = defineStore('sectionStore', () => {
  const params = useRouteParams();
  const sectionRepository = useSectionRepository();

  const sectionDataStore = new DataStore<
    SectionWithRelations,
    SectionWithRelations
  >({
    get: (id) => {
      if (id === NEW_SECTION_ID) {
        return createSectionDto(params.workId, {});
      }

      return sectionRepository.get(id).then((data) => {
        if (data.work_id !== params.workId) {
          NotificationService.error('Section is no part of the work');
          return null;
        }
        return data;
      });
    },
    items: { create: sectionRepository.create, patch: sectionRepository.patch },
  });

  sectionDataStore.setId(params.sectionId);

  const sources = computed(() => {
    return createSourceContent(sectionDataStore.data.value?.section_text ?? []);
  });

  const saveOrUpdate = (section: SectionWithRelations) => {
    return params.sectionId === NEW_SECTION_ID
      ? sectionDataStore.createItem(section)
      : sectionDataStore.patchItem(params.sectionId, section);
  };

  return {
    section: computed(() => sectionDataStore.data.value),
    sectionId: params.sectionId,
    saveOrUpdate,
    sources,
    reload: () => sectionDataStore.reload(),
  };
});
