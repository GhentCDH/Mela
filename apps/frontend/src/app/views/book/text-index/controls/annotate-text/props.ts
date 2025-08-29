import type { W3CAnnotation } from '@ghentcdh/annotated-text';

export type MODES =
  | 'generate'
  | 'create-annotation'
  | 'create-example'
  | 'edit'
  | 'translate'
  | 'link_buckets'
  | 'adjust_annotation';

export const CREATE_MODES: MODES[] = ['create-annotation', 'create-example'];

export type AnnotationWithRelations = {
  annotation: W3CAnnotation;
  relations: W3CAnnotation[];
};
