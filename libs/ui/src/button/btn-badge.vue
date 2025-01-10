<template>
  <button
    :class="[`badge badge-xs`, BadgeSize[size]]"
    :type="type"
    :disabled="disabled"
    v-bind="properties"
    @click="emit('click')"
  >
    <slot />
    <Icon
      v-if="icon"
      :icon="icon"
      :size="size"
    />
  </button>
</template>

<script setup lang="ts">
import { BadgeSize, ButtonSize } from '../const/size';
import { Icon } from '../icons';
import { ButtonProps } from './btn.vue';
import { ButtonTag, ButtonType } from './const';

const properties = withDefaults(
  defineProps<Omit<ButtonProps, 'outline' | 'square'>>(),
  {
    tag: ButtonTag.button,
    type: ButtonType.button,
    size: ButtonSize.xs,
  },
);

const emit = defineEmits(['click']);
</script>
