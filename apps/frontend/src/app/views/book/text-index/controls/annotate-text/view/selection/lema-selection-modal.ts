import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';

import type { AnnotationSelectionModalResult } from './annotation-selection-modal.props';

export type LemaSelectionModalProps = {
  onClose: (result: AnnotationSelectionModalResult) => void;
  parentAnnotation: W3CAnnotation;
  annotation?: W3CAnnotation;
  source: SourceModel;
  storeId: string;
  mode?: 'create' | 'edit';
};
