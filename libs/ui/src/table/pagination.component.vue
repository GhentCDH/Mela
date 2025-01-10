<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Btn } from '@ghentcdh/ui';

const props = defineProps({
  totalItems: { type: Number, default: 0 },
  itemsPerPage: { type: Number, default: 1 },
  currentPage: { type: Number, default: 1 },
});

const emit = defineEmits(['updatePage', 'updatePageSize']);

const totalPages = ref(Math.ceil(props.totalItems / props.itemsPerPage));
const pages = ref<
  {
    page: () => number;
    label: string;
    activePage: number;
    hide?: () => boolean;
    disabled?: () => boolean;
  }[]
>([]);

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

  if (min < 1) {
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

const hidePage = (page: number) => {
  if (totalPages.value <= MIN_PAGES) {
    return false;
  }

  if (page === 1 || page === totalPages.value || page === props.currentPage) {
    return false;
  }

  const { min, max } = hideRange.value;

  return min > page || page > max;
};

const updatePages = () => {
  pages.value = [
    {
      page: () => 1,
      label: `<<`,
      activePage: -2,
      disabled: () => props.currentPage === 1,
    },
    {
      page: () => props.currentPage - 1,
      label: `<`,
      activePage: -1,
      disabled: () => props.currentPage === 1,
    },
    {
      page: () => props.currentPage - 1,
      label: 1,
      activePage: 1,
    },
    {
      page: () => props.currentPage - 1,
      label: `...`,
      activePage: -10,
      disabled: () => true,
      hide: () => hideRange.value.min < 3,
    },
    Array.from({ length: totalPages.value - 2 }, (_, i) => {
      const page = i + 2;

      return {
        page: () => page,
        label: `${page}`,
        activePage: page,
        hide: () => hidePage(page),
      };
    }),
    {
      page: () => props.currentPage - 1,
      label: `...`,
      activePage: -11,
      disabled: () => true,
      hide: () => hideRange.value.max >= totalPages.value - 1,
    },
    {
      page: () => totalPages.value,
      label: `${totalPages.value}`,
      activePage: totalPages.value,
      hide: () => totalPages.value < 2,
    },
    {
      page: () => props.currentPage + 1,
      label: `>`,
      activePage: -3,
      disabled: () => props.currentPage === totalPages.value,
    },
    {
      page: () => props.totalItems,
      label: `>>`,
      activePage: -4,
      disabled: () => props.currentPage === totalPages.value,
    },
  ].flat();
};

watch([() => props.totalItems, () => props.itemsPerPage], () => {
  totalPages.value = Math.ceil(props.totalItems / props.itemsPerPage);
  updatePages();
});

const goToPage = (page: () => number) => {
  emit('updatePage', page());
};

updatePages();
</script>
<template>
  <div class="flex gap-2">
    <div class="flex flex-1 justify-center items-center">
      <div class="join">
        <Btn
          v-for="page in pages"
          :key="page.activePage"
          :disabled="page.disabled?.()"
          :square="true"
          size="xs"
          :class="[
            'join-item btn btn-outline  btn-xs',
            {
              'btn-active': page.activePage === props.currentPage,
              hidden: page.hide?.(),
            },
          ]"
          @click="goToPage(page.page)"
        >
          {{ page.label }}
        </Btn>
      </div>
    </div>
    <div class="text-sm">page {{ currentPage }} of {{ totalPages }}</div>
  </div>
</template>
