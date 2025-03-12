import type { ExampleDto } from '@mela/text/shared';
import { getAnnotationUri } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';

import type {
  findBodyType,
  SpecificResourceSchema,
  TextTargetSchema,
  type TextualBody,
  TextualBodyClassifyingSchema,
  W3CAnnotation,
  W3CAnnotationSchema,
} from '@ghentcdh/annotations/core';

import { PREFIX_NEW } from './text-selection-annotation';

export const PURPOSE_EXAMPLE = 'example';

export const createExample = (annotation: W3CAnnotation, dto: ExampleDto) => {
  const text = findBodyType<TextualBody>(
    'TextualBody',
    (body: TextualBody) => !!body.language,
  )(annotation);

  const processingLanguage = text?.language;

  return W3CAnnotationSchema.parse({
    // The W3C Annotation model
    id: `${PREFIX_NEW}${uuidv4()}`,
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    body: [
      TextualBodyClassifyingSchema.parse({ purpose: PURPOSE_EXAMPLE }),
      SpecificResourceSchema.parse({ value: dto }),
    ],
    target: [
      TextTargetSchema.parse({
        source: getAnnotationUri(annotation),
        processingLanguage,
      }),
    ],
  });
};
