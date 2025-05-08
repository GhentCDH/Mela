<template>
  <div
    :class="[
      {
        'w-full h-full': !size,
        'w-2 h-2': size === 'xs',
        'w-4 h-4': size === 'sm',
      },
    ]"
    v-html="IconMap[icon]"
  />
</template>

<script setup lang="ts">
import type { IconDef } from './icon-list';
import { IconMap } from './icon-list';
import type { Size } from '../const/size';

defineProps<{
  icon: IconDef;
  size?: Size;
}>();
</script>
