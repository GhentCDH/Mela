import { getAnnotationUri } from '@mela/text/shared';

import {
  SpecificResourceSchema,
  TextTargetSchema,
  TextualBodyClassifyingSchema,
} from '@ghentcdh/annotations/core';
import {
  Annotation,
  AnnotationTarget,
  Text,
} from '@ghentcdh/mela/generated/types';

import { CreateAnnotationDto } from '../../dto';

const createLink = (annotation: Annotation) => {
  // const text = findBodyType<TextualBody>(
  //   'TextualBody',
  //   (body: TextualBody) => !!body.language,
  // )(annotation);
  // const processingLanguage = text?.language;

  return {
    source_id: annotation.id,
    source_type: 'annotation',
    value: TextTargetSchema.parse({
      source: getAnnotationUri(annotation),
      // TODO is this needed? processingLanguage,
    }) as any,
  } as Partial<AnnotationTarget>;
};

export const createLinks = (
  text: Pick<Text, 'id'>,
  purpose: string,
  annotations: Annotation[],
  value?: any,
): CreateAnnotationDto => {
  return {
    motivation: 'tagging',
    text_id: text.id,
    annotationBody: [
      {
        value: TextualBodyClassifyingSchema.parse({
          purpose: 'tagging',
          value: purpose,
        }),
      },
      value
        ? {
            value: SpecificResourceSchema.parse({
              value: value,
            }),
          }
        : undefined,
    ].filter((v) => !!v),
    annotationTarget: annotations.map(createLink),
  } as unknown as CreateAnnotationDto;
};
