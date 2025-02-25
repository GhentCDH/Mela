<template>
  <toast />
  <ModalWrapper />
  <div class="drawer">
    <input
      id="my-drawer-3"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content flex flex-col h-[100VH]">
      <nav class="navbar bg-primary text-primary-content w-full">
        <div class="navbar-start">
          <label
            for="my-drawer-3"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost p-1"
          >
            <Icon :icon="IconEnum.Hamburger" />
          </label>
        </div>
        <div class="navbar-center">
          <a
            class="btn btn-ghost text-xl"
            :href="baseUrl"
          >{{ title }}</a>
        </div>
        <div class="navbar-end" />
      </nav>
      <div class="p-2 bg-white mb-1 mr-1 flex-1 shadow-sm">
        <slot />
      </div>
    </div>
    <div class="drawer-side mt-16">
      <label
        for="my-drawer-3"
        aria-label="close sidebar"
        class="drawer-overlay"
      />
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <li
          v-for="item of menu"
          :key="item.label"
        >
          <RouterLink :to="{ name: item.routerLink, params: item.params }">
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from './menu.type';
import { Icon, IconEnum } from '../icons';
import { ModalWrapper } from '../modal';
import Toast from '../toast/toast.vue';

const baseUrl = import.meta.env.BASE_URL;

defineProps<{
  title: string;
  menu: Menu;
}>();
</script>
