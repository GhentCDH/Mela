import type { W3CAnnotation } from '@ghentcdh/annotated-text';

export type MODES = 'translate' | 'link_buckets';

export type AnnotationWithRelations = {
  annotation: W3CAnnotation;
  relations: W3CAnnotation[];
};
