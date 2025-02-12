<script setup lang="ts">
import { computed } from 'vue';

import PaginationButton, { PageProps } from './pagination-button.component.vue';

const props = defineProps({
  totalItems: { type: Number, default: 0 },
  itemsPerPage: { type: Number, default: 1 },
  currentPage: { type: Number, default: 1 },
});

const emit = defineEmits(['updatePage', 'updatePageSize']);

const totalPages = computed(() => {
  let total = Math.ceil(props.totalItems / props.itemsPerPage);

  if (total < 1) return 1;
  return total;
});

const MIN_PAGES = 6;
const MIN_PAGES_HALF = MIN_PAGES / 2;

const hideRange = computed(() => {
  if (totalPages.value <= MIN_PAGES) {
    return {
      min: 1,
      max: totalPages.value,
    };
  }

  let min = props.currentPage - MIN_PAGES_HALF;

  if (min <= 1) {
    min = 1;
  } else if (min + MIN_PAGES > totalPages.value) {
    min = totalPages.value - MIN_PAGES;
  }

  let max = min + MIN_PAGES;

  return {
    min,
    max,
  };
});

const createDummyPage = (current: number) => {
  return {
    label: `...`,
    currentPage: current,
    page: -10,
    disabled: true,
    neverActive: true,
  } as PageProps;
};

const pageNumbers = computed(() => {
  let total = totalPages.value;

  if (total < 1) total = 1;

  const current = props.currentPage;
  const pages: PageProps[] = [];
  const { min, max } = hideRange.value;

  Array.from({ length: total }, (_, i) => {
    const page = i + 1;

    if (page !== 1 && page !== total) {
      if (page > max) return;
      if (page < min) return;
    }

    if (page === total && total > 1 && max < total) {
      pages.push(createDummyPage(current));
    }
    pages.push({
      label: `${page}`,
      totalPages: total,
      currentPage: current,
      page: page,
    } as PageProps);

    if (page === 1 && total > 1 && min > 1) {
      pages.push(createDummyPage(current));
    }
  });

  return pages;
});

const goToPage = (page: number) => {
  emit('updatePage', page);
};
</script>
<template>
  <div class="flex gap-2">
    <div class="flex flex-1 justify-center items-center">
      <div class="flex gap-1">
        <PaginationButton
          v-bind="props"
          :page="1"
          label="<<"
          :current-page="currentPage"
          :never-active="true"
          :disabled="currentPage === 1"
          @update-page="goToPage"
        />
        <PaginationButton
          v-bind="props"
          :page="currentPage - 1"
          label="<"
          :current-page="currentPage"
          :never-active="true"
          :disabled="currentPage === 1"
          @update-page="goToPage"
        />
        <template v-for="page in pageNumbers" :key="page.page">
          <PaginationButton v-bind="page" @update-page="goToPage" />
        </template>

        <PaginationButton
          v-bind="props"
          :page="currentPage + 1"
          label=">"
          :current-page="currentPage"
          :never-active="true"
          :disabled="props.currentPage === totalPages"
          @update-page="goToPage"
        />
        <PaginationButton
          v-bind="props"
          :page="totalPages"
          label=">>"
          :current-page="currentPage"
          :never-active="true"
          :disabled="props.currentPage === totalPages"
          @update-page="goToPage"
        />
      </div>
    </div>
    <div class="text-sm">page {{ currentPage }} of {{ totalPages }}</div>
  </div>
</template>
