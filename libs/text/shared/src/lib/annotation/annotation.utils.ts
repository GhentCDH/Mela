import type { SpecificResource, W3CAnnotation } from '@ghentcdh/annotated-text';
import { findBodyType } from '@ghentcdh/annotated-text';

import { isExampleUri, isLemmaUri } from '../utils/uri';

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
export const findLemmaMetaData = (
  w3CAnnotation: Pick<W3CAnnotation, 'body'>,
) => {
  return findBodyType<SpecificResource>(
    'SpecificResource',
    (body: SpecificResource) => {
      return isLemmaUri(body.source);
    },
  )(w3CAnnotation);
};
