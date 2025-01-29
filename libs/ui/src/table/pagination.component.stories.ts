import type { Meta, StoryFn } from '@storybook/vue3';

import PaginationComponent from './pagination.component.vue';

export default {
  title: 'Components/table/pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { PaginationComponent },
  setup() {
    return { args };
  },
  template: `
    <PaginationComponent v-bind="args">
       
    </PaginationComponent>`,
});
const itemsPerPage = 20;
export const Default = Template.bind({});
Default.args = {
  totalItems: itemsPerPage * 5,
  itemsPerPage,
  currentPage: 1,
};

export const OnePage = Template.bind({});
OnePage.args = {
  totalItems: 1,
  itemsPerPage,
  currentPage: 1,
};

export const ZeroItems = Template.bind({});
ZeroItems.args = {
  totalItems: 0,
  itemsPerPage,
  currentPage: 1,
};

export const ALotOfItems = Template.bind({});
ALotOfItems.args = {
  totalItems: itemsPerPage * 48,
  itemsPerPage,
  currentPage: 1,
};

export const MiddleOfListSelectedItems = Template.bind({});
MiddleOfListSelectedItems.args = {
  totalItems: itemsPerPage * 50,
  itemsPerPage,
  currentPage: 25,
};

export const EndOfListSelected = Template.bind({});
EndOfListSelected.args = {
  totalItems: itemsPerPage * 48,
  itemsPerPage,
  currentPage: 48,
};
