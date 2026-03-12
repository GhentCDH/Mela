import type { PropType } from 'vue';
import { SourceModel } from '../types/source.model';
import type { W3CAnnotation } from '@ghentcdh/annotated-text';
import { AnnotationConfiguration } from '../types/AnnotationConfiguration.model';

export const SourceEditProperties = {
  config: { type: Object as PropType<AnnotationConfiguration>, required: true },
  source: { type: Object as PropType<SourceModel>, required: true },
  annotations: { type: Array as PropType<W3CAnnotation[]>, required: true },
};
