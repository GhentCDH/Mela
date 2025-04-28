import type { AnnotationExampleLemma } from '@mela/text/shared';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import { AnnotationSelectionModalResult } from './annotation-selection-modal.props';

export type LemaSelectionModal = {
  onClose: (result: LinkLemmaModalResult) => void;
  annotation: W3CAnnotation;
  textContent: SourceModel;
};

export type LinkLemmaModalResult<DATA = any> = {
  data: AnnotationExampleLemma;
  valid: boolean;
};

export type LemaSelectionModalProps = {
  onClose: (result: AnnotationSelectionModalResult) => void;
  parentAnnotation?: W3CAnnotation;
  annotation: W3CAnnotation;
  textContent: SourceModel;
  storeId: string;
  mode?: 'create' | 'edit';
};
