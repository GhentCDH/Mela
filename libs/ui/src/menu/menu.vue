<template>
  <ul class="menu menu-horizontal">
    <li>
      <details open>
        <summary>{{ title }}</summary>
        <ul class="bg-base-100 rounded-t-none p-2">
          <li
            v-for="item in menu"
            :key="item.label"
          >
            <button
              v-if="item.onClick"
              @click="item.onClick"
            >
              {{ item.label }}
            </button>
            <RouterLink
              v-if="item.routerLink"
              :to="{ name: item.routerLink, params: item.params }"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </details>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { MenuClickItem, MenuLinkItem } from './menu.type';

defineProps<{
  title: string;
  menu: Array<MenuLinkItem | MenuClickItem>;
}>();
</script>
