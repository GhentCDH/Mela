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
import { BadgeSize, Size } from '../const/size';
import { Icon, IconEnum } from '../icons';
import { ButtonType } from './const';
import { BadgeColor, Color } from '../const/colors';

defineProps({
  icon: { required: false, type: IconEnum, default: undefined },
  type: { default: 'button', required: false, type: ButtonType },
  color: { default: 'default', required: false, type: Color },
  disabled: { default: false, required: false, type: Boolean },
  size: { default: 'sm', required: false, type: Size },
});

const emit = defineEmits(['click']);
</script>
