import { ref } from 'vue';

import { ConfirmModal } from './index';

import type {
  CloseProps,
  ConfirmModalProps,
  ConfirmResult,
  ModalWrapperModel,
} from './modal.model';

export class ModalService {
  private static instance: ModalService;

  public showModal = ref(false);

  public modal: ModalWrapperModel<CloseProps<unknown>, unknown> | null = null;

  private openModal<PROPS extends CloseProps<RESULT>, RESULT>(
    modal: ModalWrapperModel<PROPS, RESULT>,
  ) {
    const onClose = modal.props.onClose;

    modal.props.onClose = (result: RESULT) => {
      onClose(result);
      this.closeModal();
    };

    this.modal = modal as unknown as ModalWrapperModel<
      CloseProps<unknown>,
      unknown
    >;
    this.showModal.value = true;
  }

  private closeModal() {
    this.modal = null;
    this.showModal.value = false;
  }

  static showConfirm<
    PROPS extends ConfirmModalProps & CloseProps<ConfirmResult>,
  >(props: PROPS) {
    this.getInstance().openModal<PROPS, ConfirmResult>({
      component: ConfirmModal,
      props: props,
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ModalService();
    }

    return this.instance;
  }
}
