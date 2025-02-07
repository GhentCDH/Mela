import type { Annotation } from '@ghentcdh/vue-component-annotated-text';

import type { AnnotationMetadataType, W3CAnnotation } from '@mela/text/shared';
import { TextualBodySchema, W3CAnnotationSchema } from '@mela/text/shared';

export const parseAnnotation = (
  text: string,
  annotation: Annotation,
  textType: AnnotationMetadataType,
): W3CAnnotation => {
  const textValue = text.substring(annotation.start, annotation.end);
  return W3CAnnotationSchema.parse({
    // The W3C Annotation model
    id: annotation.id,
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    body: [
      { type: 'AnnotationType', textType: textType },
      TextualBodySchema.parse({
        language: 'gr',
        value: textValue,
      }),
    ],
    target: [
      {
        source: 'mela/text/954d9ec8-920b-4749-a7f4-d526e297837e',
        textDirection: 'ltr',
        type: 'Text',
        processingLanguage: 'gr',
        selector: {
          type: 'TextPositionSelector',
          start: annotation.start,
          end: annotation.end,
        },
      },
    ],
  });
};
