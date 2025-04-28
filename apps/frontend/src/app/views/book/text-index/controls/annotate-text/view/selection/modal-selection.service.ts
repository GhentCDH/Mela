import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { ModalService } from '@ghentcdh/ui';

import type {
  AnnotationSelectionModalProps,
  AnnotationSelectionModalResult,
} from './annotation-selection-modal.props';
import AnnotationSelectionModal from './annotation-selection-modal.vue';
import ExampleSelectionModal from './example-selection.modal.vue';
import type { AnnotationType } from '../../../identify.color';

const modalSelection: Record<AnnotationType, any> = {
  example: ExampleSelectionModal,
  title: AnnotationSelectionModal,
  subtitle: AnnotationSelectionModal,
  paragraph: AnnotationSelectionModal,
  phrase: AnnotationSelectionModal,
  lemma: null,
};

export class ModalSelectionService {
  static createSelection(
    props: Pick<
      AnnotationSelectionModalProps,
      'annotation' | 'textContent' | 'annotationType' | 'storeId'
    >,
  ) {
    const component = modalSelection[props.annotationType];

    if (!component)
      throw new Error('No component found for this annotation type');

    ModalService.openModal<
      AnnotationSelectionModalProps,
      AnnotationSelectionModalResult
    >({
      component,
      props: {
        ...props,
        mode: 'create',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClose: (result: AnnotationSelectionModalResult) => {},
      },
    });
  }

  static editSelection(
    props: Pick<
      AnnotationSelectionModalProps,
      'annotation' | 'textContent' | 'annotationType' | 'storeId'
    > & { parent: W3CAnnotation },
  ) {
    const component = modalSelection[props.annotationType];

    if (!component)
      throw new Error('No component found for this annotation type');

    ModalService.openModal<
      AnnotationSelectionModalProps,
      AnnotationSelectionModalResult
    >({
      component,
      props: {
        ...props,
        mode: 'edit',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClose: (result: AnnotationSelectionModalResult) => {},
      },
    });
  }
}
