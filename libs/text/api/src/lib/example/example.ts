import { getAnnotationUri, getExampleUri } from '@mela/text/shared';

import {
  SpecificResourceSchema,
  TextTargetSchema,
  TextualBodyClassifyingSchema,
} from '@ghentcdh/annotations/core';
import {
  Annotation,
  AnnotationBody,
  AnnotationTarget,
  Example,
  Text,
  TextContent,
} from '@ghentcdh/mela/generated/types';

import { CreateAnnotationDto } from '../annotation/dto';

export const PURPOSE_EXAMPLE = 'example';

export const createExampleAnnotation = (
  example: Example,
  annotationTarget: Annotation,
  text: Text,
  textContent: TextContent,
): CreateAnnotationDto => {
  return {
    motivation: 'tagging',
    text_id: text.id,
    annotationBody: [
      {
        value: TextualBodyClassifyingSchema.parse({
          purpose: PURPOSE_EXAMPLE,
        }),
      } as unknown as AnnotationBody,
      {
        value: SpecificResourceSchema.parse({
          value: example.name,
          source: getExampleUri(example),
        }),
        source_id: example.id,
        source_type: 'example',
      } as unknown as AnnotationBody,
    ],
    annotationTarget: [
      {
        source_id: annotationTarget.id,
        source_type: 'annotation',
        value: TextTargetSchema.parse({
          source: getAnnotationUri(annotationTarget),
          processingLanguage: textContent.language,
        }),
      } as unknown as AnnotationTarget,
    ],
  } as unknown as CreateAnnotationDto;
};
