import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { TextContent } from '@ghentcdh/mela/generated/types';

export type LinkLemaModalProps = {
  onClose: (result: LinkLemaModalResult) => void;
  annotation: W3CAnnotation;
  textContent: TextContent;
};

export type LinkLemaModalResult<DATA = any> = {
  data: DATA;
  valid: boolean;
};
