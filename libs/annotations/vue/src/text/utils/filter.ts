import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  filterAnnotations,
  findTextPositionSelector,
} from '@ghentcdh/annotations/core';

import type { AnnotationConfig, TextAnnotation } from '../../model';

export const transformAnnotation = (
  annotation: W3CAnnotation,
  sourceUri: string,
  config: AnnotationConfig,
): TextAnnotation => {
  const selector = findTextPositionSelector(sourceUri)(annotation)?.selector;

  if (!selector) return null;

  return {
    id: annotation.id,
    start: selector.start,
    end: selector.end,
    target: config?.mapTarget?.(annotation, sourceUri) ?? 'text',
    color: config?.mapColor?.(annotation, sourceUri) ?? undefined,
  } as TextAnnotation;
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
