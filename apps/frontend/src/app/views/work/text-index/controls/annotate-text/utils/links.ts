import { getAnnotationIdFromUri } from '@mela/text/shared';

import type { W3CAnnotation } from '@ghentcdh/annotated-text';
import {
  findAnnotations,
  findRelatedAnnotation,
} from '@ghentcdh/annotated-text';
import { findPurposeLowerCase } from '../../../../../../style/annotation.style';

export type AnnotationLink = {
  annotation: W3CAnnotation;
  relations: W3CAnnotation[];
};

export const mapRelationsToLinks = (
  sourceUri: string,
  annotations: W3CAnnotation[],
): AnnotationLink[] => {
  return findAnnotations(annotations)
    .findInTargetSource(sourceUri)
    .map((link) => ({
      purpose: findPurposeLowerCase(link),
      annotation: link,
      relations: findRelatedAnnotation(
        annotations,
        getAnnotationIdFromUri,
      )(link),
    }));
};
