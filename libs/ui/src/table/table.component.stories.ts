import type { Meta, StoryFn } from '@storybook/vue3';

import TextCell from './cells/text.cell.vue';
import type { DisplayColumn } from './table.vue';
import Table from './table.vue';

export default {
  title: 'Components/table',
  component: Table,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { Table, TextCell },
  setup() {
    return { args };
  },
  template: `
    <Table v-bind="args">
       
    </Table>`,
});

const displayColumns: Array<DisplayColumn> = [
  {
    component: TextCell,
    id: 'name',
    label: 'Name',
  },
  {
    component: TextCell,
    id: 'firstName',
    label: 'First Name',
  },
];

const data = [
  { name: 'Six', firstName: 'Joren' },
  { name: 'Vandersteene', firstName: 'Bo' },
];

const pageSize = 20;
const page = {
  count: pageSize * 5,
  pageSize,
  page: 1,
};

export const Default = Template.bind({});
Default.args = {
  loading: false,
  displayColumns,
  data,
  page,
  sort: {
    sortColumn: 'name',
  },
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  displayColumns,
  page,
};
