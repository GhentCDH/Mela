import type { Meta, StoryFn } from '@storybook/vue3';

import ToastMessage from './toast-message.vue';

export default {
  title: 'Components/Toast',
  component: ToastMessage,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { ToastMessage },
  setup() {
    return { args };
  },
  template: `
    <ToastMessage v-bind="args">
       
    </ToastMessage>`,
});

export const Success = Template.bind({});
Success.args = {
  message: 'Success',
  type: 'success',
};

export const Error = Template.bind({});
Error.args = {
  message: 'Error',
  type: 'error',
};

export const Info = Template.bind({});
Info.args = {
  message: 'info',
  type: 'info',
};

export const Warning = Template.bind({});
Warning.args = {
  message: 'Warning',
  type: 'warning',
};
