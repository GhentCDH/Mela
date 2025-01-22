import type { Meta, Story } from '@storybook/vue3';

import BtnBadge from './btn-badge.vue';
import { ButtonColor } from '../const/colors';
import { ButtonSize } from '../const/size';
import { IconEnum } from '../icons/icon-list';
import Icon from '../icons/icon.vue';

export default {
  title: 'Components/Button badge',
  component: BtnBadge,
  tags: ['autodocs'],
} as Meta;

const Template: Story = (args) => ({
  components: { BtnBadge },
  setup() {
    return { args };
  },
  template: '<Btn v-bind="args">{{ args.label }}</Btn>',
});

const All: Story = (args) => ({
  components: { BtnBadge, Icon },
  setup() {
    return {
      configs: {
        default: {},
        square: { square: true },
        ['square outline']: { square: true, outline: true },
        outline: { outline: true },
      },
      icons: [undefined, IconEnum.Plus],
      buttonSize: Object.values(ButtonSize),
      buttonColor: ['Default', ...Object.values(ButtonColor)],
    };
  },
  template: `
  <table>
    <thead>
      <th></th>
      <template v-for="icon in icons" :key="icon">
        <th v-for="size in buttonSize" :key="size">{{size}}</th>
      </template>
    </thead>
    <tbody>
    <template v-for="(item, key, index) in configs" :key="index">
     <tr> <th>{{key}}</th></tr>
     <tr
        v-for="color in buttonColor"
        :key="color"
      >
      <td>{{color}}</td>
      <template v-for="icon in icons" :key="icon">
        <td v-for="size in buttonSize"
            :key="size"
            class="text-center m-2"
          > 
          <BtnBadge v-bind="item" :size="size" :color="color" :icon="icon">
            {{ item.square ? icon ? '' : 'Square' : 'Button'}} 
          </BtnBadge>
        </td>
      </template>
      </tr>
      </template>
    </tbody>
  </table>
  </div> 
`,
});

export const AllTypes = All.bind({});
AllTypes.args = {};

export const Default = Template.bind({});
Default.args = {
  label: 'Primary Button',
  outline: true,
};

export const AsLink = Template.bind({});
AsLink.args = {
  label: 'Secondary Button',
  as: 'a',
};
