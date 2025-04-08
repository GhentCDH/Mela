import type { JsonFormsLayout } from '@ghentcdh/json-forms/core';
import { ModalService } from '@ghentcdh/ui';

import type { FormModal, type FormModalProps, FormModalResult } from './index';

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
    ModalService.openModal<FormModalProps, FormModalResult>({
      component: FormModal,
      props: {
        formSchema,
        data: initialData ?? {},
        modalTitle,
        onClose,
      },
    });
  }
}
