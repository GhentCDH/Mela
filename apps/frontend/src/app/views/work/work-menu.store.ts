import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { Section } from '@mela/generated-types';
import type { Breadcrumb, MenuWithItems } from '@ghentcdh/ui';

import { useWorkStore } from './work.store';
import { computeBreadcrumb } from '../../utils/compute-breadcrumb';
import type { MenuView } from '../../utils/compute-menu';
import { computeMenu } from '../../utils/compute-menu';
import { useSectionStore } from './section-store';

export const useWorkMenu = defineStore('workMenu', () => {
  const workStore = useWorkStore();
  const sectionStore = useSectionStore();
  const view = ref<MenuView | null>(null);

  const extraMenu = ref([]);

  const defaultMenu = computed(() => {
    const work = workStore.work;
    const _view = view.value;

    return [computeMenu(work, _view)].flat();
  });

  const menu = computed(() => [defaultMenu.value, extraMenu.value].flat());

  const resetMenu = () => {
    extraMenu.value = [];
  };
  const resetView = () => {
    view.value = null;
  };
  const setExtraMenu = (newMenu: MenuWithItems[]) => {
    extraMenu.value = newMenu;
  };

  const extraBreadcrumb = ref([]);
  const defaultBreadcrumbs = computed(() => {
    const section = sectionStore.section;
    const work = workStore.work;
    return computeBreadcrumb(work, section as Section);
  });

  const breadcrumbs = computed(() =>
    [defaultBreadcrumbs.value, extraBreadcrumb.value].flat(),
  );
  const resetBreadcrumbs = () => {
    extraBreadcrumb.value = [];
  };
  const setBreadcrumbs = (newBreadcrumbs: Breadcrumb[]) => {
    extraBreadcrumb.value = newBreadcrumbs;
  };

  const setView = (_view: MenuView) => {
    view.value = _view;
  };

  return {
    menu,
    breadcrumbs,
    resetView,
    resetMenu,
    resetBreadcrumbs,
    setExtraMenu,
    setBreadcrumbs,
    setView,
  };
});
