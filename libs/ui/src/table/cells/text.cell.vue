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
});

const renderer = defineComponent({
  name: 'TextCell',
  props: {
    ...rendererProps(),
  },
  computed: {
    value() {
      return this.data[this.column.id];
    },
  },
  beforeMount() {
    // console.log('TextCell', this.data, this.column);
  },
});

export default renderer;
</script>
