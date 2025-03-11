import { getExampleUri, getTextContentUri } from '@mela/text/shared';
import { pick } from 'lodash-es';

import type { TextAnnotation } from '@ghentcdh/annotations/core';
import {
  SpecificResourceSchema,
  TextTargetSchema,
  TextualBodyClassifyingSchema,
  TextualBodySchema,
  createTextPositionSelector,
} from '@ghentcdh/annotations/core';
import type {
  AnnotationBody,
  AnnotationTarget,
  ExampleWithRelations,
  TextContent,
} from '@ghentcdh/mela/generated/types';

import { CreateAnnotationDto } from '../annotation/dto';

export const PURPOSE_EXAMPLE = 'example';

export const createExampleAnnotation = (
  example: ExampleWithRelations,
  textContent: TextContent,
  annotation: TextAnnotation,
): CreateAnnotationDto => {
  const sourceUri = getTextContentUri(textContent) as string;
  const language = textContent.language;
  return {
    motivation: 'tagging',
    text_id: textContent.text_id,
    annotationBody: [
      {
        value: TextualBodyClassifyingSchema.parse({
          purpose: PURPOSE_EXAMPLE,
        }),
      } as unknown as AnnotationBody,
      {
        value: TextualBodyClassifyingSchema.parse({ value: 'example' }),
      } as unknown as AnnotationBody,
      {
        value: TextualBodySchema.parse({
          language: language,
          value: example.name,
          source: sourceUri,
        }),
      } as unknown as AnnotationBody,
      {
        value: SpecificResourceSchema.parse({
          // TODO define what should go here, do we store the metadata or do we rebuild it later?
          value: {
            name: example.name,
            register: pick(example.register, 'id', 'name'),
          },
          source: getExampleUri(example),
        }),
        source_id: example.id,
        source_type: 'example',
      } as unknown as AnnotationBody,
    ],
    annotationTarget: [
      {
        source_id: textContent.id,
        source_type: 'text_content',
        value: TextTargetSchema.parse({
          source: sourceUri,
          processingLanguage: language,
        }),
      } as unknown as AnnotationTarget,
      {
        source_id: textContent.id,
        source_type: 'text_content',
        value: createTextPositionSelector(sourceUri, language, annotation),
      },
    ],
  } as unknown as CreateAnnotationDto;
};
