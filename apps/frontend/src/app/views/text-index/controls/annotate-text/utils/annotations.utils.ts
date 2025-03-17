import type { AnnotationMetadataType } from '@mela/text/shared';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { findTagging } from '@ghentcdh/annotations/core';
import type { Annotation } from '@ghentcdh/mela/generated/types';

export type AnnotationFilter = {
  annotationType?: AnnotationMetadataType[];
};

const filterAnnotation = (
  annotation: W3CAnnotation,
  filter: AnnotationFilter,
) => {
  if (filter.annotationType && filter.annotationType.length > 0) {
    const type = findTagging(annotation)?.value as AnnotationMetadataType;

    return filter.annotationType.includes(type);
  }
  return true;
};

const filterValues = (
  filter: AnnotationFilter,
  annotations: W3CAnnotation[],
): W3CAnnotation[] => {
  return annotations?.filter((a) => filterAnnotation(a, filter)) ?? [];
};

const byId = (
  id: string,
  annotations: W3CAnnotation[],
): W3CAnnotation | null => {
  if (!id) return null;
  return annotations?.find((a) => a.id === id) ?? null;
};

const byPrefix = (
  prefix: string,
  annotations: W3CAnnotation[],
): W3CAnnotation | null => {
  if (!prefix) return null;
  return annotations?.find((a) => a.id.startsWith(prefix)) ?? null;
};

export const AnnotationUtils = (annotations: Annotation[]) => {
  return {
    byId: (id: string) => byId(id, annotations),
    byPrefix: (prefix: string) => byPrefix(prefix, annotations),
    filter: (filter: AnnotationFilter) => filterValues(filter, annotations),
  };
};
