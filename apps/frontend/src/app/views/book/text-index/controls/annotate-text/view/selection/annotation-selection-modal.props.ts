import type z from 'zod';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';

import type { AnnotationType as Type } from '../../../identify.color';

export type AnnotationSelectionModalProps = {
  onClose: (result: AnnotationSelectionModalResult) => void;
  parentAnnotation?: W3CAnnotation;
  annotation?: W3CAnnotation;
  source: SourceModel;
  annotationType: Type;
  storeId: string;
  schema?: z.ZodRawShape;
  mode?: 'create' | 'edit';
  enableSave?: boolean;
};

export type ExampleSelectionModalProps = {
  onClose: (result: AnnotationSelectionModalResult) => void;
  parentAnnotation?: W3CAnnotation;
  annotation: W3CAnnotation;
  source: SourceModel;
  storeId: string;
  mode?: 'create' | 'edit';
};

export type AnnotationSelectionModalResult<DATA = any> = {
  data: W3CAnnotation;
  valid: boolean;
};
