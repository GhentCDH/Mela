import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import type { AnnotationExampleLema } from '@mela/text/shared';

export type LinkLemaModalProps = {
  onClose: (result: LinkLemaModalResult) => void;
  annotation: W3CAnnotation;
  textContent: SourceModel;
};

export type LinkLemaModalResult<DATA = any> = {
  data: AnnotationExampleLema;
  valid: boolean;
};
