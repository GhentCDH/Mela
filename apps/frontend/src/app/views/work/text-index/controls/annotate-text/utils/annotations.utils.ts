import type { AnnotationMetadataType } from '@mela/text/shared';

import type { W3CAnnotation } from '@ghentcdh/annotated-text';
import { findTagging } from '@ghentcdh/annotated-text';
import type { Annotation } from '@mela/generated-types';

export type AnnotationFilter = {
  annotationType?: AnnotationMetadataType[];
  annotationId?: string;
};

const filterAnnotation = (
  annotation: W3CAnnotation,
  filter: AnnotationFilter,
) => {
  if (filter.annotationId) {
    return filter.annotationId === annotation.id;
  }
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
