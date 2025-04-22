import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { Chapter } from '@ghentcdh/mela/generated/types';
import type { Breadcrumb, MenuWithItems } from '@ghentcdh/ui';

import { useBookStore } from './book.store';
import { computeBreadcrumb } from '../../utils/compute-breadcrumb';
import { computeMenu } from '../../utils/compute-menu';

export const useBookMenuStore = defineStore('bookMenu', () => {
  const bookStore = useBookStore();

  const extraMenu = ref([]);

  const defaultMenu = computed(() => {
    const chapter = bookStore.chapter;
    const book = bookStore.book;

    return [computeMenu(book)].flat();
  });

  const menu = computed(() => [defaultMenu.value, extraMenu.value].flat());

  const resetMenu = () => {
    extraMenu.value = [];
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

  return {
    menu,
    breadcrumbs,
    resetMenu,
    resetBreadcrumbs,
    setExtraMenu,
    setBreadcrumbs,
  };
});
