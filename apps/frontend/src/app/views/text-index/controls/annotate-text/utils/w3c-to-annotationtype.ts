import type {
  AnnotationSelector} from '@mela/text/shared';
import {
  AnnotationSelectorSchema,
  getTextContentIdFromUri,
} from '@mela/text/shared';

import type {
  W3CAnnotation,
  type W3CAnnotationTarget,
  findTagging,
  findTargetType,
} from '@ghentcdh/annotations/core';


export const w3cAnnotationToAnnotationSelector = (
  annotation: W3CAnnotation,
): AnnotationSelector => {
  const textPositionSelector = findTargetType<W3CAnnotationTarget>(
    'Text',
    (body) => {
      return body.selector?.type === 'TextPositionSelector';
    },
  )(annotation);
  const tagging = findTagging(annotation);

  const textContentId = getTextContentIdFromUri(textPositionSelector.source);

  return AnnotationSelectorSchema.parse({
    annotation: {
      // TODO check if new id
      id: annotation.id,
      tagging: tagging.value,
      ...textPositionSelector.selector,
    },
    textContent: { id: textContentId },
  });
};

export const w3cAnnotationsToAnnotationSelectors = (
  annotations: W3CAnnotation[],
): AnnotationSelector[] => {
  return annotations.map((annotation) =>
    w3cAnnotationToAnnotationSelector(annotation),
  );
};
