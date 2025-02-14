import type { Styles } from '@jsonforms/vue-vanilla';

import type { MyStyles } from '../styles';

export const showErrors = (
  isTouched: boolean,
  isFocused: boolean,
  errors: string | undefined,
) => {
  return !!(isTouched && errors);
};

export const inputClasses = (
  styles: MyStyles | Styles,
  isFocused: boolean,
  isTouched: boolean,
  errors: string | undefined,
) => {
  return [
    styles?.control.input,
    { 'input-error': showErrors(isTouched, isFocused, errors) },
  ];
};
