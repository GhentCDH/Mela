import { Meta, Story } from '@storybook/vue3';

import { IconEnum } from './icon-list';
import Icon from './icon.vue';

export default {
  title: 'Components/Icons',
  component: Icon,
  tags: ['autodocs'],
} as Meta;

const All: Story = (args) => ({
  components: { Icon },
  setup() {
    return {
      icons: IconEnum,
    };
  },
  template: `
  <div class="flex flex-wrap gap-2">
    <template v-for="icon in icons" :key="icon">
    <div class="text-center h-10">
      <div class="h-10 w-10 m-auto">
        <Icon :icon="icon"></Icon>
      </div>
      {{icon}}
      </div>
    </template>
    </div>
`,
});

export const AllTypes = All.bind({});
AllTypes.args = {};
