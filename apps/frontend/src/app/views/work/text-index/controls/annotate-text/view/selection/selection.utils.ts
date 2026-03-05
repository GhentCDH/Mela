import { annotationDto, AnnotationType, SourceModel } from '@mela/text/shared';
import type z from 'zod';

import type { W3CAnnotation } from '@ghentcdh/annotated-text';
import { findTextPositionSelector } from '@ghentcdh/annotated-text';

import type { AnnotationType as type } from '../../../identify.color';

export const createSelection = (
  annotation: W3CAnnotation,
  annotationType: type,
  sourceModel: SourceModel,
  schema: z.Schema<AnnotationType>,
  extraData: Record<string, any> = {},
) => {
  // Add the original start and endpoint
  const selector = annotation
    ? findTextPositionSelector(sourceModel.uri)(annotation)
    : null;

  return annotationDto.parse({
    type: annotationType,
    textSelector: {
      ...selector,
      sectionTextId: sourceModel.id,
    },
    value: extraData,
  });
};
