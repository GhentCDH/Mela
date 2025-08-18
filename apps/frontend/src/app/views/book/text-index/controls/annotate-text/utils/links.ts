import { getAnnotationIdFromUri } from '@mela/text/shared';

import type { W3CAnnotation } from '@ghentcdh/vue-component-annotated-text';
import {
  findAnnotations,
  findRelatedAnnotation,
} from '@ghentcdh/vue-component-annotated-text';

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
