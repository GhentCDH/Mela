import type { AnnotationMetadataType, W3CAnnotation } from '@mela/text/shared';
import { TextualBodySchema, W3CAnnotationSchema } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';

import type { Annotation } from '@ghentcdh/vue-component-annotated-text';

export const parseAnnotationFromText = (
  text: string,
  annotation: string,
  type: AnnotationMetadataType,
) => {
  const start = text.indexOf(annotation);
  const end = start + annotation.length;
  return parseAnnotation(text, { start, end }, type);
};

export const parseAnnotation = (
  text: string,
  annotation: Pick<Annotation, 'start' | 'end'> & { id?: string },
  textType: AnnotationMetadataType,
): W3CAnnotation => {
  const textValue = text.substring(annotation.start, annotation.end);

  // TODO add prefix and suffix from the text

  return W3CAnnotationSchema.parse({
    // The W3C Annotation model
    id: annotation.id ?? uuidv4(),
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
