import { W3CAnnotation, W3CAnnotationTarget } from '@ghentcdh/annotations/core';

export const findSourceInTargets = (
  targets: W3CAnnotationTarget[] | W3CAnnotationTarget,
  sourceUri: string,
): W3CAnnotationTarget[] => {
  if (!Array.isArray(targets))
    return targets.source === sourceUri ? [targets] : [];

  return targets.filter((target) => target.source === sourceUri);
};

export const hasSourceInTargets = (
  targets: W3CAnnotationTarget[] | W3CAnnotationTarget,
  sourceUri: string,
) => {
  if (!Array.isArray(targets)) return targets.source === sourceUri;

  return targets.some((target) => target.source === sourceUri);
};

export const filterAnnotations = (
  annotations: W3CAnnotation[],
  sourceUri: string,
) => {
  return annotations.filter((annotation) =>
    hasSourceInTargets(annotation.target, sourceUri),
  );
};
