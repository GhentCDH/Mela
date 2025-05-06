import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { ModalService } from '@ghentcdh/ui';

import type {
  AnnotationSelectionModalProps,
  AnnotationSelectionModalResult,
} from './annotation-selection-modal.props';
import AnnotationSelectionModal from './annotation-selection-modal.vue';
import ExampleSelectionModal from './example-selection.modal.vue';
import LemmaSelectionModal from './lemma-selection-modal.vue';
import type { AnnotationType } from '../../../identify.color';

const modalSelection: Record<AnnotationType, any> = {
  example: ExampleSelectionModal,
  title: AnnotationSelectionModal,
  subtitle: AnnotationSelectionModal,
  paragraph: AnnotationSelectionModal,
  phrase: AnnotationSelectionModal,
  lemma: LemmaSelectionModal,
};

export class ModalSelectionService {
  static createSelection(
    props: Pick<
      AnnotationSelectionModalProps,
      'parentAnnotation' | 'source' | 'annotationType' | 'storeId'
    > & { onClose?: (result: AnnotationSelectionModalResult) => void },
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

        onClose: (result: AnnotationSelectionModalResult) => {
          props.onClose?.(result);
        },
      },
    });
  }

  static editSelection(
    props: Pick<
      AnnotationSelectionModalProps,
      'source' | 'annotationType' | 'storeId'
    > & { parentAnnotation: W3CAnnotation; annotation: W3CAnnotation } & {
      onClose?: (result: AnnotationSelectionModalResult) => void;
    },
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
        onClose: (result: AnnotationSelectionModalResult) => {
          props.onClose?.(result);
        },
      },
    });
  }

  static createLemma(
    props: Pick<
      LemmaSelectionModal,
      'parentAnnotation' | 'source' | 'storeId'
    > & {
      onClose?: (result: AnnotationSelectionModalResult) => void;
    },
  ) {
    return this.createSelection({ ...props, annotationType: 'lemma' });
  }
}
