import type { TextualBody, W3CAnnotation } from '@ghentcdh/annotated-text';
import { findBodyType } from '@ghentcdh/annotated-text';

/**
 * @deprecated should use the one from the core library
 * @param annotations
 */
export const findTextValue = (annotations: W3CAnnotation) => {
  if (!annotations) return null;

  return findBodyType<TextualBody>(
    'TextualBody',
    (body: TextualBody) => !!body.language,
  )(annotations);
};
