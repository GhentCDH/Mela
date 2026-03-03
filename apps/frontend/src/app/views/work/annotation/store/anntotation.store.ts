import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import { useSectionRepository } from '../../../../repository/section.repository';
import { computed, effect, ref, watch } from 'vue';
import { ReloadRef } from '../../text-index/controls/annotate-text/utils/reload';
import { W3CAnnotation } from '@ghentcdh/annotated-text';

export const useAnnotationStore = (id: string) =>
  defineStore(`annotation_store_${id}`, () => {
    const route = useRoute();
    const sectionRepository = useSectionRepository();

    const sectionId = ref(route.params.sectionId as string);
    const reload = ReloadRef();
    const allAnnotations = ref<W3CAnnotation[]>([]);
    const annotations = computed(() => {
      return allAnnotations.value;
    });
    watch(
      () => route.params.sectionId,
      (newId, oldId) => {
        if (newId !== oldId) sectionId.value = newId as string;
      },
    );

    effect(() => {
      console.log('load annotations');
      const _r = reload.watchReload;
      const _sectionId = sectionId.value;

      sectionRepository
        .getAnnotations(_sectionId)
        .then((_annotations: W3CAnnotation[]) => {
          if (_sectionId !== sectionId.value) return;

          allAnnotations.value = _annotations;
        });
    });

    return { annotations };
  })();
