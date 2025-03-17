import type { W3CAnnotation } from '@ghentcdh/annotations/core';

export type MODES =
  | 'generate'
  | 'create-annotation'
  | 'create-example'
  | 'edit'
  | 'translate'
  | 'link_buckets';

export const CREATE_MODES: MODES[] = ['create-annotation', 'create-example'];

export type AnnotationWithRelations = {
  annotation: W3CAnnotation;
  relations: W3CAnnotation[];
};
