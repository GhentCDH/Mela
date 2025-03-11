import type {
  SpecificResource,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';
import { findBodyType } from '@ghentcdh/annotations/core';

import { isExampleUri } from '../utils/uri';

export const isNewExampleUri = (uri: string) => uri.startsWith('new-');

export const findExampleMetaData = (
  w3CAnnotation: Pick<W3CAnnotation, 'body'>,
) => {
  return findBodyType<SpecificResource>(
    'SpecificResource',
    (body: SpecificResource) => {
      console.log(body);
      console.log(isExampleUri(body.source));
      return isExampleUri(body.source);
    },
  )(w3CAnnotation);
};
