<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl" :href="baseUrl">{{ title }}</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li v-for="item of menu">
          <RouterLink :to="item.routerLink" class="btn btn-ghost">
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
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
