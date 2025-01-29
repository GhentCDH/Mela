import type { Styles } from '@jsonforms/vue-vanilla';

import type { MyStyles } from '../../../styles';

type ErrorCheck = {
  isTouched: boolean;
  errors: [];
  styles: MyStyles | Styles;
};

export const showErrors = <E extends ErrorCheck>({ isTouched, errors }: E) => {
  return !!(isTouched && errors);
};

export const inputClasses = (props: ErrorCheck) => {
  return [props.styles.control.input, { 'input-error': showErrors(props) }];
};
