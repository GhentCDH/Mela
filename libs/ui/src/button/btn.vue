<template>
  <as
    :class="[
      `btn  p-1 flex justify-center`,
      color,
      ButtonSize[size],
      color ? ButtonColor[color] : '',
      { 'btn-square': square },
      { 'btn-outline': outline },
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
  </as>
</template>

<script setup lang="ts">
import { Icon, IconEnum } from '../icons';
import { ButtonTag, ButtonType } from './const';
import { ButtonColor, Color } from '../const/colors'; // TODO add properties for links
import { ButtonSize, Size } from '../const/size';

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
  outline: false,
  size: Size.sm,
  square: false,
});

const emit = defineEmits(['click']);
</script>
