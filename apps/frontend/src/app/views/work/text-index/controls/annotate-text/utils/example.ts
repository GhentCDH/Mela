import { isExampleUri } from '@mela/text/shared';

import type {
  findBodyType,
  SpecificResource,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import type { Register } from '@mela/generated-types';

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
