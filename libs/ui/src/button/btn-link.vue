<template>
  <a
    :class="[`btn btn-outline btn-sm p-1 flex`]"
    :href="href"
  >
    <div
      v-if="icon"
      class="h-4 w-4"
    >
      <Icon :icon="icon" />
    </div>
    <slot />
  </a>
</template>

<script setup lang="ts">
import { Icon, IconDef } from '../icons';

defineProps<{
  icon?: IconDef;
  href: string;
}>();
</script>
