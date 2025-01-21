<template>{{ value }}</template>

<script>
import { defineComponent } from 'vue';

const rendererProps = () => ({
  data: {
    type: Object,
    required: true,
  },
  column: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    required: false,
  },
});

const renderer = defineComponent({
  name: 'TextCell',
  props: {
    ...rendererProps(),
  },
  computed: {
    value() {
      const value = this.data[this.column.id];
      if (!value) return null;

      if (this.column.options?.format === 'keyValue') {
        return value[this.column.options.key];
      }

      return value;
    },
  },
  beforeMount() {},
});

export default renderer;
</script>
