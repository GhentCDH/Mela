import type { TextAnnotation} from '@ghentcdh/annotations/core';
import { TextTargetSchema } from '@ghentcdh/annotations/core';

export const createTextPositionSelector = (
  sourceUri: string,
  language: string,
  annotation: Pick<TextAnnotation, 'start' | 'end'> & { id?: string },
) => {
  return TextTargetSchema.parse({
    source: sourceUri,
    textDirection: 'ltr',
    type: 'Text',
    processingLanguage: language,
    selector: {
      type: 'TextPositionSelector',
      start: annotation.start,
      end: annotation.end,
    },
  });
};
