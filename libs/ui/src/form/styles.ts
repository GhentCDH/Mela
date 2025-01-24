import { defaultStyles, mergeStyles } from '@jsonforms/vue-vanilla';

export const myStyles = mergeStyles(defaultStyles, {
  group: {
    root: 'group',
    label: 'text-primary text-lg font-bold',
    item: 'group-item',
  },
  verticalLayout: {
    root: 'flex flex-col gap-x-2',
    item: 'w-full',
    // item: 'flex flex-col gap-x-2',
  },
  horizontalLayout: {
    root: 'flex flex-row gap-x-2',
    // item: 'flex flex-row gap-x-2',
  },
  control: {
    root: 'form-control w-full',
    wrapper: 'flex flex-col',
    label: 'text-md font-semibold justify-start gap-2',
    error: '',
    input: 'input',
    description: 'form-control--description label text-xs text-gray-500',
  },
});
