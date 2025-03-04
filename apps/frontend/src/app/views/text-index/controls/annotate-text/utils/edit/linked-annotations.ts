import { getAnnotationUri } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';

import type {
  TextualBody,
  W3CAnnotation} from '@ghentcdh/annotations/core';
import {
  TextTargetSchema,
  TextualBodyClassifyingSchema,
  W3CAnnotationSchema,
  findBodyType,
} from '@ghentcdh/annotations/core';


import { PREFIX_NEW } from './text-selection-annotation';


export const createTranslationAnnotation = (
  ...annotations: W3CAnnotation[]
): W3CAnnotation => {
  return W3CAnnotationSchema.parse({
    // The W3C Annotation model
    id: `${PREFIX_NEW}${uuidv4()}`,
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    body: [TextualBodyClassifyingSchema.parse({ purpose: 'translation' })],
    target: annotations.map((a) => {
      const text = findBodyType<TextualBody>(
        'TextualBody',
        (body: TextualBody) => !!body.language,
      )(a);
      const processingLanguage = text?.language;

      return TextTargetSchema.parse({
        source: getAnnotationUri(a),
        processingLanguage,
      });
    }),
  });
};
