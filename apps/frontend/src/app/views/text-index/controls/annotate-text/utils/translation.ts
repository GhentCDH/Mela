import type {
  SourceModel,
  TextAnnotation,
  TextualBody,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';
import { findBodyType } from '@ghentcdh/annotations/core';

export const findTextValue = (annotations: W3CAnnotation) => {
  if (!annotations) return null;

  return findBodyType<TextualBody>(
    'TextualBody',
    (body: TextualBody) => !!body.language,
  )(annotations);
};

export const getTextSelection = (
  text: SourceModel,
  annotation: TextAnnotation,
) => {
  return text.content.text.substring(annotation.start, annotation.end);
};
