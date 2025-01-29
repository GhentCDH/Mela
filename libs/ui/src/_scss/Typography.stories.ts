import type { Meta, StoryFn } from '@storybook/vue3';

import Style from './style.vue';

export default {
  title: 'Styles',
  component: Style,
} as Meta;

const Template: StoryFn = (args) => ({
  components: { Style },
  setup() {
    return {
      args,
    };
  },
  template: `
  
  <div class="flex-wrap flex  gap-4 max-w-2xl">
        <Style v-bind="args"></Style>
    </template>
    </div>
    
`,
});

export const Typography = Template.bind({});
Typography.args = {
  items: [{ as: 'h1' }, { as: 'h2' }, { as: 'h3' }, { as: 'a' }, { as: 'div' }],
  title: 'Typography',
};
