import type { PropType } from 'vue';
import type { SourceModel } from '@mela/text/shared';
import type { W3CAnnotation } from '@ghentcdh/annotated-text';

export const ContentEditProperties = {
  source: { type: Object as PropType<SourceModel>, required: true },
  annotations: { type: Array as PropType<W3CAnnotation[]>, required: true },
  storeId: { type: String, required: true },
};
