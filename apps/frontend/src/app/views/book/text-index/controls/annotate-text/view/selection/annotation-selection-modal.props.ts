import type { AnnotationType } from '@mela/text/shared';
import type z from 'zod';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';

import type { AnnotationType as type } from '../../../identify.color';

export type AnnotationSelectionModalProps = {
  onClose: (result: AnnotationSelectionModalResult) => void;
  parentAnnotation?: W3CAnnotation;
  annotation: W3CAnnotation;
  textContent: SourceModel;
  annotationType: type;
  storeId: string;
  schema?: z.Schema<AnnotationType>;
  mode?: 'create' | 'edit';
  enableSave?: boolean;
};

export type ExampleSelectionModalProps = {
  onClose: (result: AnnotationSelectionModalResult) => void;
  parentAnnotation?: W3CAnnotation;
  annotation: W3CAnnotation;
  textContent: SourceModel;
  storeId: string;
  mode?: 'create' | 'edit';
};

export type AnnotationSelectionModalResult<DATA = any> = {
  data: any;
  valid: boolean;
};
