import { v4 as uuidv4 } from 'uuid';

import type { MyStyles} from './styles';
import { myStyles } from './styles';


export type ControlProperties = {
  id?: string;
  description?: string;
  errors?: string;
  label?: string;
  visible?: boolean;
  required?: boolean;
  enabled?: boolean;
  isFocused?: boolean;
  isTouched?: boolean;
  hideLabel?: boolean;
  styles?: MyStyles;
};

export const DefaultControlProperties = () => {
  return {
    id: uuidv4(),
    visible: true,
    required: false,
    enabled: true,
    isFocused: false,
    isTouched: false,
    hideLabel: false,
    styles: myStyles,
  } as ControlProperties;
};

export type ControlWrapperProperties = ControlProperties;

export type SelectControlProperties = ControlProperties & {
  options: Array<any>;
  valueKey?: string;
  labelKey?: string;
};

export const DefaultSelectProperties = () => {
  return {
    ...DefaultControlProperties(),
    options: [] as any[],
    valueKey: 'value',
    labelKey: 'label',
  };
};

export type AutoCompleteConfig = {
  uri: string;
  skipAuth?: boolean;
  dataField: string;
};

export type AutoCompleteProperties = ControlProperties & {
  config?: AutoCompleteConfig;
  options?: Array<any>;
  valueKey?: string;
  labelKey?: string;
};

export const DefaultAutoCompleteProperties = () => {
  return {
    ...DefaultControlProperties(),
    options: [] as Array<any>,
    valueKey: 'value',
    labelKey: 'label',
  } as AutoCompleteProperties;
};
