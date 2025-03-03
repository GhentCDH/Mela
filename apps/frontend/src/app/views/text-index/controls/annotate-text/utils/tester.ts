import type { Annotation } from '@ghentcdh/mela/generated/types';

import { PREFIX_GENERATED } from './generate-blocks';
import { PREFIX_NEW } from './edit/text-selection-annotation';

export const AnnotationTester = (annotation: Pick<Annotation, 'id'>) => {
  return {
    isNew: () =>
      annotation?.id &&
      (annotation.id.startsWith(PREFIX_NEW) ||
        annotation.id.startsWith(PREFIX_GENERATED)),
  };
};
