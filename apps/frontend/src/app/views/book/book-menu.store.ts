import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { Chapter } from '@mela/generated-types';
import type { Breadcrumb, MenuWithItems } from '@ghentcdh/ui';

import { useBookStore } from './book.store';
import { computeBreadcrumb } from '../../utils/compute-breadcrumb';
import type { MenuView } from '../../utils/compute-menu';
import { computeMenu } from '../../utils/compute-menu';

export const useBookMenuStore = defineStore('bookMenu', () => {
  const bookStore = useBookStore();
  const view = ref<MenuView | null>(null);

  const extraMenu = ref([]);

  const defaultMenu = computed(() => {
    const chapter = bookStore.chapter;
    const book = bookStore.book;
    const _view = view.value;

    return [computeMenu(book, _view)].flat();
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
    const chapter = bookStore.chapter;
    const book = bookStore.book;
    return computeBreadcrumb(book, chapter as Chapter);
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
