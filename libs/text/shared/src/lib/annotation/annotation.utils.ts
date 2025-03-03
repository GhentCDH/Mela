import type {
  SpecificResource,
  W3CAnnotation} from '@ghentcdh/annotations/core';
import {
  findBodyType
} from '@ghentcdh/annotations/core';

import { isExampleUri } from './annotation.utils';

export const isNewExampleUri = (uri: string) => uri.startsWith('new-');

export const findExampleMetaData = (
  w3CAnnotation: Pick<W3CAnnotation, 'body'>,
) => {
  return findBodyType<SpecificResource>(
    'SpecificResource',
    (body: SpecificResource) => isExampleUri(body.source),
  )(w3CAnnotation);
};
