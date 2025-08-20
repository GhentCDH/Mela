import type { JsonFormsLayout } from '@ghentcdh/json-forms-core';

import type { FormEventListener } from '../state/form.state';

export type FormModalProps = {
  modalTitle: string;
  saveLabel?: string;
  cancelLabel?: string;
  formSchema: JsonFormsLayout;
  eventListener?: FormEventListener;
  onClose: (result: any) => void;
  data: any;
};

export type FormModalResult<DATA = any> = {
  data: DATA;
  valid: boolean;
};
