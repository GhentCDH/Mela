<template>
  <div class="dropdown dropdown-end">
    <div
      tabindex="0"
      role="button"
      :class="[btnClass, 'btn btn-ghost text-right flex-nowrap flex']"
    >
      <span> {{ label }}</span>
      <Icon
        :icon="IconEnum.ChevronDown"
        :size="Size.sm"
      />
    </div>
    <ul
      tabindex="0"
      class="menu dropdown-content bg-white z-1 mt-4 p-2 shadow-sm"
    >
      <li class="min-w-max flex-no-wrap text-black">
        <MenuItem
          v-for="item in items"
          :key="item.label"
          v-bind="item"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue';
import type { MenuWithItems } from './menu.type';
import { Size } from '../const';
import { Icon, IconEnum } from '../icons';

const properties = defineProps<MenuWithItems & { btnClass: string }>();
</script>
