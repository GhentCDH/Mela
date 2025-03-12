import type {
  SpecificResource,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';
import { findBodyType } from '@ghentcdh/annotations/core';

import { isExampleUri } from '../utils/uri';

export const findExampleMetaData = (
  w3CAnnotation: Pick<W3CAnnotation, 'body'>,
) => {
  return findBodyType<SpecificResource>(
    'SpecificResource',
    (body: SpecificResource) => {
      return isExampleUri(body.source);
    },
  )(w3CAnnotation);
};
