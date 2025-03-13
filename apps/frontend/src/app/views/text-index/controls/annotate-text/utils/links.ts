import { getAnnotationIdFromUri } from '@mela/text/shared';

import type {
  W3CAnnotation} from '@ghentcdh/annotations/core';
import {
  findAnnotations,
  findRelatedAnnotation
} from '@ghentcdh/annotations/core';


export const mapRelationsToLinks = (
  sourceUri: string,
  annotations: W3CAnnotation[],
) => {
  return findAnnotations(annotations)
    .findInTargetSource(sourceUri)
    .map((link) => ({
      annotation: link,
      relations: findRelatedAnnotation(
        annotations,
        getAnnotationIdFromUri,
      )(link),
    }));
};
