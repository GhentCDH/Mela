import type { Meta, StoryFn } from '@storybook/vue3';

import ShellComponent from './shell.component.vue';

export default {
  title: 'Components/Shell',
  component: ShellComponent,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { ShellComponent },
  setup() {
    return { args };
  },
  template: `
    <ShellComponent v-bind="args">
        The shell component container
    </ShellComponent>`,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Shell demo',
};
