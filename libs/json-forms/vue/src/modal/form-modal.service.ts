import type { JsonFormsLayout } from '@ghentcdh/json-forms-core';
import { ModalService } from '@ghentcdh/ui';

import { FormModal, type FormModalProps, type FormModalResult } from './index';

export class FormModalService {
  static openModal<DATA = any>({
    initialData,
    modalTitle,
    formSchema,
    onClose,
  }: {
    initialData?: DATA;
    formSchema: JsonFormsLayout;
    modalTitle: string;
    onClose: (result: FormModalResult) => void;
  }) {
    const component = FormModal;
    ModalService.openModal<FormModalProps, FormModalResult>({
      component,
      props: {
        formSchema,
        data: initialData ?? {},
        modalTitle,
        onClose,
      },
    });
  }
}
