import type { AnnotationExampleLema } from '@mela/text/shared';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';

export type LinkLemaModalProps = {
  onClose: (result: LinkLemaModalResult) => void;
  annotation: W3CAnnotation;
  textContent: SourceModel;
};

export type LinkLemaModalResult<DATA = any> = {
  data: AnnotationExampleLema;
  valid: boolean;
};
