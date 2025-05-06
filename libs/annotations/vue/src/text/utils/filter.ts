import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  filterAnnotations,
  findTextPositionSelector,
} from '@ghentcdh/annotations/core';

import type { AnnotationConfig, TextAnnotation } from '../../model';

export const transformAnnotation = (
  annotation: W3CAnnotation,
  source: SourceModel,
  config: AnnotationConfig,
): TextAnnotation => {
  const sourceUri = source.uri;
  const selector = findTextPositionSelector(sourceUri)(annotation)?.selector;

  if (!selector) return null;

  return {
    id: annotation.id,
    start: selector.start - source.content.offset,
    end: selector.end - source.content.offset,
    target: config?.mapTarget?.(annotation, sourceUri) ?? 'text',
    color: config?.mapColor?.(annotation, sourceUri) ?? undefined,
  } as TextAnnotation;
};

export const filterAnnotationsForText = (
  annotations: W3CAnnotation[],
  source: SourceModel,
  config: AnnotationConfig,
): W3CAnnotation[] => {
  return filterAnnotations(source.uri)(annotations)
    .map((annotation) => transformAnnotation(annotation, source, config))
    .filter((a) => !!a);
};
