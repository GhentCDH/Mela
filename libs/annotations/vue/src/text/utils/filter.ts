import type {
  Annotation,
  W3CAnnotation} from '@ghentcdh/annotations/core';
import {
  filterAnnotations,
  findTextPositionSelector
} from '@ghentcdh/annotations/core';

import type { AnnotationConfig } from '../../model/properties';

export const transformAnnotation = (
  annotation: W3CAnnotation,
  sourceUri: string,
  config: AnnotationConfig,
): Annotation => {
  const selector = findTextPositionSelector(sourceUri)(annotation)?.selector;

  if (!selector) return null;

  return {
    id: annotation.id,
    start: selector.start,
    end: selector.end,
    target: config?.mapTarget?.(annotation, sourceUri) ?? 'text',
    color: config?.mapColor?.(annotation, sourceUri) ?? undefined,
  } as Annotation;
};

export const filterAnnotationsForText = (
  annotations: W3CAnnotation[],
  sourceUri: string,
  config: AnnotationConfig,
): W3CAnnotation[] => {
  return filterAnnotations(sourceUri)(annotations)
    .map((annotation) => transformAnnotation(annotation, sourceUri, config))
    .filter((a) => !!a);
};
