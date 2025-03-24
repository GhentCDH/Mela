import type { Register } from '@generated/types';
import { isExampleUri } from '@mela/text/shared';

import type {
  SpecificResource,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';
import { findBodyType } from '@ghentcdh/annotations/core';

const findExampleMetadata = (annotation: W3CAnnotation) => {
  if (!annotation) return null;

  return findBodyType<SpecificResource>(
    'SpecificResource',
    (body: SpecificResource) => isExampleUri(body.source),
  )(annotation);
};

export const findRegister = (annotation: W3CAnnotation) => {
  if (!annotation) return null;

  return findExampleMetadata(annotation)?.value?.register as Register;
};
