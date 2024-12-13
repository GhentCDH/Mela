<script setup lang="ts">
import { ShellComponent } from '@ghentcdh/ui';
import { menu } from './configuration/menu';
</script>

<template>
  <ShellComponent title="MeLa | Meaning of LAnguage" :menu="menu()">
    <RouterView />
  </ShellComponent>
</template>
