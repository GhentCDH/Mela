<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-text"
        >
          <li v-for="item of menu">
            <RouterLink :to="item.routerLink" class="btn btn-ghost">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li><a>Homepage</a></li>
          <li><a>Portfolio</a></li>
          <li><a>About</a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl" :href="baseUrl">{{ title }}</a>
    </div>
    <div class="navbar-end"></div>
  </div>
  <Slot />
</template>

<script setup lang="ts">
import { Menu } from './menu.type';

const baseUrl = import.meta.env.BASE_URL;

defineProps<{
  title: string;
  menu: Menu;
}>();
</script>
