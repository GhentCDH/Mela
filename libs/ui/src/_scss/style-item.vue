<script setup lang="ts">
type StyleItem = { as?: string; class?: string };
const props = withDefaults(defineProps<StyleItem>(), {
  as: 'div',
  class: '',
});
</script>

<template>
  <as :class="props.class">
    Lorem ipsum odor amet.
  </as>
</template>
