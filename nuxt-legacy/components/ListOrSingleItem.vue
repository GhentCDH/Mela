<script setup lang="ts">
/**
 * Renders an array of items
 * If the array is empty, nothing is rendered
 * If the array consists of a single item, a single slot is rendered
 * If the array consists of multiple items, an unordered list is rendered with a slot in a list element for each item
 */
defineProps<{
  /**
   * The items to be rendered
   */
  items: Array<any>;
  /**
   * The key to be used in the v-for rendering the list items
   */
  itemKey: string;
  /**
   * Class to be added to list element
   */
  listClass?: string;
}>();
</script>

<template>
  <ul v-if="items.length > 1" :class="listClass">
    <li v-for="item in items" :key="item[itemKey]">
      <slot :item="item"></slot>
    </li>
  </ul>
  <template v-else-if="items.length == 1">
    <slot :item="items[0]"></slot>
  </template>
</template>
