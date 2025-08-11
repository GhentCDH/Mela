import type { AnnotationType } from '@mela/text/shared';
import { pick } from 'lodash-es';
import type z from 'zod';

import type { SourceModel } from '@ghentcdh/annotations/core';
import type { W3CAnnotation } from '@ghentcdh/vue-component-annotated-text';
import { findTextPositionSelector } from '@ghentcdh/vue-component-annotated-text';

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
    ? findTextPositionSelector(sourceModel.uri)(annotation)?.selector
    : null;

  const selection = {
    ...selector,
    tagging: annotationType,
  };

  // selection.start += selector?.start ?? 0;
  // selection.end += selector?.start ?? 0;

  const annotationData = {
    annotation: selection,
    id: annotation.id,
    textContent: pick(sourceModel, 'id'),
    ...extraData,
  };

  return schema.parse(annotationData);
};
