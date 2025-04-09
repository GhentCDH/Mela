<script setup lang="ts">
type StyleItem = { as?: string; class?: string };
const props = withDefaults(defineProps<StyleItem>(), {
  as: 'div',
  class: '',
});
</script>

<template>
  <component
    :is="as"
    :class="props.class"
  >
    Lorem ipsum odor amet.
  </component>
</template>
