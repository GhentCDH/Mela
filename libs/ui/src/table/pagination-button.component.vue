<script setup lang="ts">
import { Btn } from '../button';
import { Color } from '../const/colors';
import { Size } from '../const/size';
import { computed } from 'vue';

export interface PageProps {
  currentPage: number;
  page: number;
  label: string;
  neverActive?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<PageProps>(), { neverActive: false });
const emit = defineEmits(['updatePage', 'updatePageSize']);

const activePage = computed(() =>
  props.neverActive ? false : props.page === props.currentPage,
);

const color = computed(() => {
  if (props.neverActive) {
    return Color.blank;
  }

  return activePage.value ? Color.primary : Color.secondary;
});

const goToPage = () => {
  emit('updatePage', props.page);
};
</script>
<template>
  <Btn
    :disabled="disabled"
    :square="true"
    :size="Size.xs"
    :color="color"
    @click="goToPage()"
  >
    {{ label }}
  </Btn>
</template>
