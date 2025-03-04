import { W3CAnnotation } from '@ghentcdh/annotations/core';

export type MODES = 'create' | 'create-example' | 'edit';

export const CREATE_MODES: MODES[] = ['create', 'create-example'];

export type AnnotationWithRelations = {
  annotation: W3CAnnotation;
  relations: W3CAnnotation[];
};
