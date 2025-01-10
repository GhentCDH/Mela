<template>
  <div
    :class="[
      {
        'w-full h-full': !size,
        'w-2 h-2': size === Size.xs,
        'w-4 h-4': size === Size.sm,
      },
    ]"
    v-html="IconMap[icon]"
  />
</template>

<script setup lang="ts">
import { IconDef, IconMap } from './icon-list';
import { Size } from '../const/size';

defineProps<{
  icon: IconDef;
  size?: Size;
}>();
</script>
