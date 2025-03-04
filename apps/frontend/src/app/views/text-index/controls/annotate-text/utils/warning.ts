import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { ModalService } from '@ghentcdh/ui';

import { AnnotationTester } from './tester';

export const changeAnnotationSelection = (
  hasChanges: boolean,
  acvtiveAnnotation: W3CAnnotation,
): Promise<{ confirmed: boolean; undoChanges: boolean }> => {
  return new Promise((resolve) => {
    if (!hasChanges) {
      resolve({ confirmed: true, undoChanges: false });
      return;
    }

    if (AnnotationTester(acvtiveAnnotation).isNew()) {
      ModalService.showConfirm({
        title: 'Warning',
        message: 'This action will remove the newly created annotation?',
        onClose: (result) => {
          const confirmed = result.confirmed;
          resolve({ undoChanges: confirmed, confirmed });
        },
      });
    } else if (hasChanges) {
      ModalService.showConfirm({
        title: 'Warning',
        message: 'This action will undo the changes?',
        onClose: (result) => {
          const confirmed = result.confirmed;
          resolve({ undoChanges: confirmed, confirmed });
        },
      });
    }
  });
};
