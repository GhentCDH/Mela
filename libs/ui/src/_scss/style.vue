<script setup lang="ts">
import StyleItem from './style-item.vue';

type StyleItem = { as?: string; class?: string };
const props = defineProps<{ title: string; items: StyleItem[] }>();
</script>

<template>
  <div class="w-full text-2xl underline">
    {{ title }}
  </div>

  <table class="table">
    <thead>
      <tr>
        <th>As</th>
        <th>Class</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item of items"
        :key="item.as ?? item.class"
      >
        <td>{{ item.as }}</td>
        <td>{{ item.class }}</td>
        <td>
          <style-item v-bind="item" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
