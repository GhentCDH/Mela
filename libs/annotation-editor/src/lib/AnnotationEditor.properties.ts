import type { PropType } from 'vue';
import { SourceModel } from './types/source.model';
import { W3CAnnotation } from '@ghentcdh/annotated-text';
import { AnnotationDefinition } from './types/AnnotationConfiguration.model';

export const AnnotationEditorProperties = {
  sources: { type: Array as PropType<SourceModel[]>, required: true },
  annotations: { type: Array as PropType<W3CAnnotation[]>, required: true },
  cols: { type: Number, default: 2 },
  annotationDefinitions: {
    type: Array as PropType<AnnotationDefinition[]>,
    required: true,
  },
};
