import { Annotation, W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  filterAnnotations,
  findSourceInTargets,
} from '../../utils/filter-annotations';

const transformAnnotation = (
  value: W3CAnnotation,
  sourceUri: string,
): Annotation => {
  const targets = findSourceInTargets(value.target, sourceUri);

  if (!targets) return null;
  const selector = targets.find(
    (t) => t.selector?.type === 'TextPositionSelector',
  )?.selector;

  if (!selector) return null;

  return {
    id: value.id,
    start: selector.start,
    end: selector.end,
    target: 'text',
    // target: mapAnnotationType(type),
    // color: IdentifyColorMap[type],
  } as Annotation;
};

export const filterAnnotationsForText = (
  annotations: W3CAnnotation[],
  sourceUri: string,
) => {
  return filterAnnotations(annotations, sourceUri)
    .map((annotation) => transformAnnotation(annotation, sourceUri))
    .filter((a) => !!a);
};
