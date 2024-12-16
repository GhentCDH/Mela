<template>
  <div
    class="w-full h-full"
    v-html="IconMap[icon]"
  />
</template>

<script setup lang="ts">
import { IconDef, IconMap } from './icon-list';

defineProps<{
  icon: IconDef;
}>();
</script>
