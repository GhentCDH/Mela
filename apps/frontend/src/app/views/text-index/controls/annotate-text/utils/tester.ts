import type { Annotation } from '@ghentcdh/mela/generated/types';

import { PREFIX_GENERATED } from './generate-blocks';
import { PREFIX_NEW } from './parse';

export const AnnotationTester = (annotation: Annotation) => {
  return {
    isNew: () =>
      annotation.id.startsWith(PREFIX_NEW) ||
      annotation.id.startsWith(PREFIX_GENERATED),
  };
};
