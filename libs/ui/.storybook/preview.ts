import '../src/styles.scss';
import { type Preview, setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { type App } from 'vue';

import { ClickOutside } from '../src/directives/click-outside.directive';

const pinia = createPinia();

setup((app: App) => {
  app.use(pinia);
  app.directive('click-outside', ClickOutside);
});

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
