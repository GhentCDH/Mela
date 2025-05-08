<template>
  <button
    :class="[`badge gap-1`, BadgeSize[size], BadgeColor[color]]"
    :type="type"
    :disabled="disabled"
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
import type { Size } from '../const/size';
import { BadgeSize } from '../const/size';
import type { IconEnum } from '../icons';
import { Icon } from '../icons';
import { ButtonType } from './const';
import type { Color } from '../const/colors';
import { BadgeColor } from '../const/colors';

withDefaults(
  defineProps<{
    icon?: IconEnum;
    type?: ButtonType;
    color?: Color;
    disabled?: boolean;
    size?: Size;
  }>(),
  {
    icon: undefined,
    type: ButtonType.button,
    color: undefined,
    disabled: false,
    size: 'sm',
  },
);

const emit = defineEmits(['click']);
</script>
