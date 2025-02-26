import { defineClientConfig } from 'vuepress/client';
import Layout from './theme/layouts/Layout.vue';
import { createPinia } from 'pinia';
import { ClickOutside } from '../../libs/ui/src';

export default defineClientConfig({
  enhance({ app }) {
    app.use(createPinia());
    app.directive('click-outside', ClickOutside);
  },
  layouts: {
    Layout,
  },
});
