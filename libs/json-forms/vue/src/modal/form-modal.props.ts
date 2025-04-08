import type { JsonFormsLayout } from '@ghentcdh/json-forms/core';

export type FormModalProps = {
  modalTitle: string;
  saveLabel?: string;
  cancelLabel?: string;
  formSchema: JsonFormsLayout;
  onClose: (result: any) => void;
  data: any;
  id: string;
};

export type FormModalResult<DATA = any> = {
  data: DATA;
  valid: boolean;
};
