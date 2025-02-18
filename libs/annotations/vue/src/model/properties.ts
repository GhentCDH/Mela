import type { W3CAnnotation } from '@ghentcdh/annotations/core';

export type mapColor = (annotation: W3CAnnotation, sourceUri: string) => string;

export type mapTarget = (
  annotation: W3CAnnotation,
  sourceUri: string,
) => string;

export type AnnotationConfig = {
  mapColor?: (annotation: W3CAnnotation, sourceUri: string) => string;
  mapTarget?: (annotation: W3CAnnotation, sourceUri: string) => string;
};

export type AnnotationActions = { edit?: boolean; create?: boolean };
