import type { Styles } from '@jsonforms/vue-vanilla';
import { defaultStyles, mergeStyles } from '@jsonforms/vue-vanilla';

const mergedStyles = mergeStyles(defaultStyles, {
  group: {
    root: 'group',
    label: 'text-primary text-lg font-bold',
    item: 'group-item',
  },
  verticalLayout: {
    root: 'flex flex-col gap-x-2',
    item: 'w-full',
  },
  horizontalLayout: {
    root: 'flex flex-row gap-x-2',
    item: 'w-full',
  },
  arrayList: {
    root: 'fieldset',
    legend: 'fieldset-legend text-xl capitalize',
  },
  control: {
    root: 'fieldset',
    wrapper: 'fieldset',
    label: 'fieldset-legend',
    error: '',
    input: 'input',
    select: 'select',
    description: 'form-control--description label text-xs text-gray-500',
  },
}) as Styles;

export type MyStyles = Styles & {
  fixedArrayList: { root: string; item: string };
};

export const myStyles: MyStyles = {
  ...mergedStyles,
  fixedArrayList: {
    root: 'flex flex-row gap-x-2',
    item: 'w-full',
  },
} as const;
