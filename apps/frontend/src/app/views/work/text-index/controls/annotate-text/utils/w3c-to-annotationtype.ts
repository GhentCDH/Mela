import {
  AnnotationSelector,
  AnnotationSelectorSchema,
  getSectionTextIdFromUri,
} from '@mela/text/shared';

import type {
  W3CAnnotation,
  W3CAnnotationTarget,
} from '@ghentcdh/annotated-text';
import { findTagging, findTargetType } from '@ghentcdh/annotated-text';

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

  const textTranslationId = getSectionTextIdFromUri(
    textPositionSelector.source,
  );

  return AnnotationSelectorSchema.parse({
    annotation: {
      // TODO check if new id
      id: annotation.id,
      tagging: tagging.value,
      ...textPositionSelector.selector,
    },
    textTranslation: { id: textTranslationId },
  });
};

export const w3cAnnotationsToAnnotationSelectors = (
  annotations: W3CAnnotation[],
): AnnotationSelector[] => {
  return annotations.map((annotation) =>
    w3cAnnotationToAnnotationSelector(annotation),
  );
};
