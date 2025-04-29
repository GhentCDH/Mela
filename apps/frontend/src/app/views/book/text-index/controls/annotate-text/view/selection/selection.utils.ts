import type { AnnotationStartEnd, AnnotationType } from '@mela/text/shared';
import { pick } from 'lodash-es';
import type z from 'zod';

import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import { findTextPositionSelector } from '@ghentcdh/annotations/core';

import type { AnnotationType as type } from '../../../identify.color';

export const createSelection = (
  selection: AnnotationStartEnd,
  annotationType: type,
  annotation?: W3CAnnotation,
  sourceModel: SourceModel,
  schema: z.Schema<AnnotationType>,
  extraData: Record<string, any> = {},
) => {
  selection.tagging = annotationType;

  // Add the original start and endpoint
  const selector = annotation
    ? findTextPositionSelector(sourceModel.uri)(annotation)?.selector
    : null;

  selection.start += selector?.start ?? 0;
  selection.end += selector?.start ?? 0;

  const annotationData = {
    annotation: selection,
    id: selection.id,
    textContent: pick(sourceModel, 'id'),
    ...extraData,
  };

  return schema.parse(annotationData);
};
