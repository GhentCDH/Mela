<template>
  <div class="drawer">
    <input
      id="my-drawer-3"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content flex flex-col">
      <nav class="navbar bg-primary text-primary-content w-full">
        <div class="navbar-start">
          <label
            for="my-drawer-3"
            aria-label="open sidebar"
            class="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block h-6 w-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
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
      <Slot />
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
          <RouterLink :to="item.routerLink">
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu } from './menu.type';

const baseUrl = import.meta.env.BASE_URL;

defineProps<{
  title: string;
  menu: Menu;
}>();
</script>
