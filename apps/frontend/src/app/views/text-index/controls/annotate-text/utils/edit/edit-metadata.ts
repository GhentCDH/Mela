import type { ExampleDto} from '@mela/text/shared';
import { getExampleUri, isExampleUri } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';

import type {
  SpecificResource,
  W3CAnnotation} from '@ghentcdh/annotations/core';
import {
  findBodyType,
  updateBody
} from '@ghentcdh/annotations/core';

import { createSpecificResource } from './body.utils';


export type ExampleMetadata = Pick<ExampleDto, 'register'>;

const PREFIX_NEW_RESOURCE = 'new-';

export const updateExampleMetaData = (
  w3CAnnotation: W3CAnnotation,
  metaData: ExampleMetadata,
) => {
  console.log('updateExampleMetaData', w3CAnnotation);
  const metaDataUri = findExampleMetaData(w3CAnnotation)?.source;
  const updatedAnnotation = updateBody(
    w3CAnnotation,
    createSpecificResource(
      metaDataUri ??
        getExampleUri({
          id: `${PREFIX_NEW_RESOURCE}${uuidv4()}`,
        }),
      metaData,
    ),
  );

  console.log('updateExampleMetaData', updatedAnnotation);

  return updatedAnnotation;
};

export const findExampleMetaData = (w3CAnnotation: W3CAnnotation) => {
  return findBodyType<SpecificResource>(
    'SpecificResource',
    (body: SpecificResource) => isExampleUri(body.source),
  )(w3CAnnotation);
};
