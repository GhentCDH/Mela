import { defineStore } from 'pinia';
import { computed, effect, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import type { Section, SectionWithRelations } from '@mela/generated-types';
import { NotificationService } from '@ghentcdh/ui';

import router from '../../../router';
import { useSectionRepository } from '../../repository/section.repository';
import { ReloadRef } from './text-index/controls/annotate-text/utils/reload';
import { createSectionDto, NEW_SECTION_ID } from '../../utils/create-section';
import type { SourceModel } from '@mela/text/shared';
import { createSourceContent } from './text-index/controls/annotate-text/utils/source';

export const useSectionStore = defineStore('sectionStore', () => {
  const route = useRoute();
  const sectionRepository = useSectionRepository();

  const workId = ref(route.params.workId as string);
  const sectionId = ref(route.params.sectionId as string);
  const reload = ReloadRef();
  const section = ref<SectionWithRelations | null>(null);

  const sources = computed(() => {
    return createSourceContent(section.value?.section_text ?? []);
  });

  ref<SourceModel[]>([]);

  watch(
    () => route.params.sectionId,
    (newId, oldId) => {
      if (newId !== oldId) sectionId.value = newId as string;
    },
  );
  watch(
    () => route.params.workId,
    (newId, oldId) => {
      if (newId !== oldId) workId.value = newId as string;
    },
  );

  const getSection = async () => {
    if (!sectionId.value) return null;

    if (sectionId.value === NEW_SECTION_ID) {
      return createSectionDto(workId.value, {});
    }

    return sectionRepository.get(sectionId.value).then((data) => {
      if (data.work_id !== workId.value) {
        NotificationService.error('Section is no part of the work');
        return null;
      }
      return createSectionDto(workId.value, data);
    });
  };

  effect(() => {
    const _sectionId = sectionId.value;
    section.value = null;

    getSection().then((_section: SectionWithRelations) => {
      if (!_section) return;
      if (!_section.id && _sectionId !== NEW_SECTION_ID) return;
      if (_section.id !== sectionId.value) return;

      section.value = _section;
    });
  });

  const create = async (section: Partial<SectionWithRelations>) => {
    const createdSection = (await sectionRepository.create(section)) as Section;

    void router.push({
      name: 'section-detail',
      params: { sectionId: createdSection.id, workId: workId.value },
    });

    return createdSection;
  };

  const update = async (section: Partial<SectionWithRelations>) => {
    const updatedSection = await sectionRepository.patch(
      sectionId.value,
      section,
    );
    reload.reload();

    return updatedSection;
  };

  const saveOrUpdate = (section: Partial<SectionWithRelations>) => {
    return sectionId.value === NEW_SECTION_ID
      ? create(section)
      : update(section);
  };

  return {
    section,
    sectionId,
    saveOrUpdate,
    sources,
    reload: () => reload.reload(),
  };
});
