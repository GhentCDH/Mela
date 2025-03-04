import {
  findBodyType,
  TextualBody,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';

export const findTextValue = (annotations: W3CAnnotation) => {
  if (!annotations) return null;

  return findBodyType<TextualBody>(
    'TextualBody',
    (body: TextualBody) => !!body.language,
  )(annotations);
};
