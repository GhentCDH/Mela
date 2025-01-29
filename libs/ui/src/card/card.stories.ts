import type { Meta, StoryFn } from '@storybook/vue3';

import Card from './card.vue';

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { Card },
  setup() {
    return { args };
  },
  template: `
  <Card class="w-96">
    <template #title>Header</template>
    Content
    <template #actions v-if="args.showActions">
      <button class="btn btn-primary">
          Buy Now
        </button>
    </template>
  </Card>`,
});

export const Default = Template.bind({});
Default.args = {
  showActions: false,
};
