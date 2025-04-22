import type { AnnotationExampleLemma } from '@mela/text/shared';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';

export type LinkLemmaModalProps = {
  onClose: (result: LinkLemmaModalResult) => void;
  annotation: W3CAnnotation;
  textContent: SourceModel;
};

export type LinkLemmaModalResult<DATA = any> = {
  data: AnnotationExampleLemma;
  valid: boolean;
};
