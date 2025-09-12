import { AnnotationSelector, getTextContentUri } from '@mela/text/shared';

import {
  TextTargetSchema,
  TextualBodyClassifyingSchema,
  TextualBodySchema,
  createTextPositionSelector,
} from '@ghentcdh/annotated-text';
import type {
  AnnotationBody,
  AnnotationTarget,
  TextContent,
} from '@ghentcdh/mela/generated/types';

import { CreateAnnotationDto } from '../../dto';

export const PURPOSE_EXAMPLE = 'example';

export const getTextSelection = (
  textContent: TextContent,
  annotation: TextAnnotation,
) => {
  return textContent.content.substring(annotation.start, annotation.end);
};

export const createSelector = (
  textContent: TextContent,
  annotation: AnnotationSelector['annotation'],
  bodyFn?: () => AnnotationBody[],
): CreateAnnotationDto => {
  const sourceUri = getTextContentUri(textContent) as string;
  const language = textContent.language;

  return {
    motivation: 'tagging',
    text_id: textContent.text_id,
    annotationBody: [
      {
        value: TextualBodyClassifyingSchema.parse({
          value: annotation.tagging,
        }),
      } as unknown as AnnotationBody,
      {
        value: TextualBodySchema.parse({
          language: language,
          value: getTextSelection(textContent, annotation),
          source: sourceUri,
        }),
      } as unknown as AnnotationBody,
      bodyFn?.(),
    ]
      .flat()
      .filter(Boolean) as AnnotationBody[],
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
