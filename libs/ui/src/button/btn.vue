<template>
  <component
    :is="as"
    :class="[
      `btn  p-1 flex justify-center flex-nowrap`,
      ButtonColor[color],
      ButtonSize[size],
      { 'btn-outline': outline, 'btn-square': square },
    ]"
    v-bind="properties"
    @click="emit('click')"
  >
    <Icon
      v-if="icon"
      :icon="icon"
      :size="size"
    />
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { IconEnum } from '../icons';
import { Icon } from '../icons';
import { ButtonTag, ButtonType } from './const';
import { ButtonColor, Color } from '../const/colors'; // TODO add properties for links
import type { Size } from '../const/size';
import { ButtonSize } from '../const/size';

// TODO add properties for links

export interface ButtonProps {
  href?: string;
  disabled?: boolean;

  as?: ButtonTag;
  icon?: IconEnum;
  type?: ButtonType;
  outline?: boolean;
  color?: Color;
  size?: Size;
  square?: boolean;
}

const properties = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  as: ButtonTag.button,
  type: ButtonType.button,
  color: Color.primary,
  outline: false,
  size: 'sm',
  square: false,
});

const emit = defineEmits(['click']);
</script>
