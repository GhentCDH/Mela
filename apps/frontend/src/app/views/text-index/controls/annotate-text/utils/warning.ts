import { ConfirmResult, ModalService } from '@ghentcdh/ui';
import { AnnotationStore } from './annotation.store';

export const changeAnnotationSelection = (
  store: AnnotationStore,
): Promise<ConfirmResult> => {
  const annotation = store.selectedAnnotation;

  return new Promise<ConfirmResult>((resolve) => {
    if (!annotation) {
      resolve({ confirmed: true });
      return;
    }

    if (annotation.isNew()) {
      ModalService.showConfirm({
        title: 'Warning',
        message: 'This action will remove the newly created annotation?',
        onClose: (result) => {
          if (result.confirmed) store.undoChanges();
          resolve(result);
        },
      });
    } else if (annotation.hasChanges()) {
      ModalService.showConfirm({
        title: 'Warning',
        message: 'This action will undo the changes?',
        onClose: (result) => {
          if (result.confirmed) store.undoChanges();
          resolve(result);
        },
      });
    } else {
      store.selectAnnotation(null);
      resolve({ confirmed: true });
    }
  });
};
