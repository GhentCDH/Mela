import type { Styles } from '@jsonforms/vue-vanilla';
import type { PropType } from 'vue';

import { myStyles } from './styles';

const createProperties = (properties: any = {}) => {
  return {
    id: {
      required: false as const,
      type: String,
    },
    description: {
      required: false as const,
      type: String,
      default: undefined,
    },
    errors: {
      required: false as const,
      type: String,
      default: undefined,
    },
    label: {
      required: false as const,
      type: String,
      default: undefined,
    },
    visible: {
      required: false as const,
      type: Boolean,
      default: true,
    },
    required: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    enabled: {
      required: false as const,
      type: Boolean,
      default: true,
    },
    isFocused: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    isTouched: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    hideLabel: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    styles: {
      required: false as const,
      type: Object as PropType<Styles>,
      default: myStyles,
    },
    ...properties,
  } as const;
};

export const ControlWrapperProperties = createProperties();

export const SelectControl = createProperties({
  options: {
    required: true as const,
    type: Object as unknown as Array<any>,
  },
  valueKey: {
    required: false as const,
    type: String,
    default: 'id',
  },
  labelKey: {
    required: false as const,
    type: String,
    default: 'label',
  },
});
