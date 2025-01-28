import type { Meta, StoryFn } from '@storybook/vue3';

import { IconEnum } from './icon-list';
import Icon from './icon.vue';

export default {
  title: 'Components/Icons',
  component: Icon,
  tags: ['autodocs'],
} as Meta;

const All: StoryFn = (args) => ({
  components: { Icon },
  setup() {
    return {
      icons: IconEnum,
    };
  },
  template: `
  
  <div class="flex-wrap flex  gap-4 max-w-2xl">
    <template v-for="icon in icons" :key="icon">
    <div class="flex gap-2 items-center  w-40 text-left">
      <div class="h-10 w-10 border dark:border-gray-200 shadow rounded p-2">
        <Icon :icon="icon"></Icon>
      </div>
      <span class="text-sm overflow-hidden">{{icon}}</span>
      
      </div>
    </template>
    </div>
    
`,
});

export const AllTypes = All.bind({});
AllTypes.args = {};
