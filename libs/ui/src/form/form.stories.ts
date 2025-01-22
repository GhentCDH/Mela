import type { Meta, Story } from '@storybook/vue3';

import FormComponent from './form.component.vue';

export default {
  title: 'Components/Form',
  component: FormComponent,
  tags: ['autodocs'],
} as Meta;

const Template: Story = (args) => ({
  components: { FormComponent },
  setup() {
    return { args };
  },
  template: '<FormComponent v-bind="args">{{ args.label }}</FormComponent>',
});

export const Default = Template.bind({});
Default.args = {};
