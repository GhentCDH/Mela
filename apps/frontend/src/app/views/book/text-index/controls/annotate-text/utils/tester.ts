import { PREFIX_NEW } from '@ghentcdh/annotations/core';
import type { Annotation } from '@ghentcdh/mela/generated/types';

import { PREFIX_GENERATED } from './generate-blocks';

export const AnnotationTester = (annotation: Pick<Annotation, 'id'>) => {
  return {
    isNew: () =>
      annotation?.id &&
      (annotation.id.startsWith(PREFIX_NEW) ||
        annotation.id.startsWith(PREFIX_GENERATED)),
  };
};
