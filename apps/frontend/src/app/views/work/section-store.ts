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
      console.log('get section', id);
      if (id === NEW_SECTION_ID) {
        return createSectionDto(routerParams.get('workId'), {});
      }

      return sectionRepository.get(id).then((data) => {
        if (data.work_id !== routerParams.get('workId')) {
          NotificationService.error('Section is no part of the work');
          return null;
        }
        return data;
      });
    },
    items: { create: sectionRepository.create, patch: sectionRepository.patch },
  });

  routerParams.watch('sectionId', (id) => {
    console.log(id);
    sectionId.value = id as string;
    sectionDataStore.setId(id as string);
  });

  const sources = computed(() => {
    return createSourceContent(sectionDataStore.data.value?.section_text ?? []);
  });

  const saveOrUpdate = (section: SectionWithRelations) => {
    return section.id === NEW_SECTION_ID
      ? sectionDataStore.createItem(section)
      : sectionDataStore.patchItem(section.id, section);
  };

  return {
    section: computed(() => sectionDataStore.data.value),
    sectionId,
    saveOrUpdate,
    sources,
    reload: () => sectionDataStore.reload(),
  };
});
