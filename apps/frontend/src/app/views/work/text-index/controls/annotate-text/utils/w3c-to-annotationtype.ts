import {
  AnnotationSelector,
  AnnotationSelectorSchema,
  getSectionTextIdFromUri,
} from '@mela/text/shared';

import {
  findTagging,
  findTextPositionSelector,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';

export const w3cAnnotationToAnnotationSelector = (
  annotation: W3CAnnotation,
): AnnotationSelector => {
  const tagging = findTagging(annotation);
  const textPositionSelector = findTextPositionSelector()(annotation);

  throw new Error('Not implemented');
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
