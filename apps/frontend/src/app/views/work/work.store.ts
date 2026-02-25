import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, effect, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { NotificationService } from '@ghentcdh/ui';

import router from '../../../router';
import { useWorkRepository } from '../../repository/work.repository';
import { useSectionRepository } from '../../repository/section.repository';
import { ReloadRef } from './text-index/controls/annotate-text/utils/reload';
import { TextTranslationDto } from '@mela/text/shared';

export const NEW_SECTION_ID = 'NEW_SECTION_ID';

export const useWorkStore = defineStore('workStore', () => {
  const route = useRoute();
  const sectionRepository = useSectionRepository();
  const workRepository = useWorkRepository();

  const workId = ref(route.params.workId as string);
  const sectionId = ref(route.params.sectionId as string);

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
  const sections = computed(() => work.value?.section ?? []);

  const defaultSource = {
    language: 'gr',
    content: '',
    text_type: 'SOURCE',
  };

  const defaultTranslation = {
    language: 'en',
    content: '',
    text_type: 'TRANSLATION',
  };

  const reload = ReloadRef();
  const section = ref<SectionWithRelations | null>(null);

  const getSection = async () => {
    if (!sectionId.value) return null;

    if (sectionId.value === NEW_SECTION_ID) {
      return {
        section_number: '',
        name: '',
        text: [{ textContent: [defaultSource, defaultTranslation] }],
        work: { id: workId.value },
      };
    }

    return sectionRepository
      .get(sectionId.value)
      .then((section: SectionWithRelations) => {
        if (section.work_id !== workId.value) {
          NotificationService.error('Section is no part of the work');
          return null;
        }
        // for now we only support one text per section
        const text = section.text?.[0] ?? { textContent: [] };
        const textContent = [
          text.textTranslation?.find((t) => t.text_type === 'SOURCE') ??
            ({ ...defaultSource } as TextTranslationWithRelations),
          text.textTranslation?.find((t) => t.text_type === 'TRANSLATION') ??
            ({
              ...defaultTranslation,
            } as TextTranslationWithRelations),
        ];
        return {
          ...section,
          text: [{ ...text, textContent }],
        };
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

  const work = computedAsync(() => {
    if (!workId.value) return null;

    return workRepository.get(workId.value) as Promise<WorkWithRelations>;
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

  const sources = computed(() => {
    const textContent = section.value?.text[0].textContent ?? [];

    const textSource = [
      textContent.find((t) => t.text_type === 'SOURCE') ??
        ({
          ...defaultSource,
        } as TextTranslationDto),
      textContent.find((t) => t.text_type === 'TRANSLATION') ??
        ({
          ...defaultTranslation,
        } as TextTranslationDto),
    ];

    return textSource as TextTranslationDto[];
  });

  return { section, sectionId, saveOrUpdate, sources, work, sections };
});
