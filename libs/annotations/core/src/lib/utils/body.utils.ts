import type {
  TextualBodyClassifying,
  W3CAnnotation,
  W3CAnnotationBody,
  W3CAnnotationBodyType,
} from '../model';
import { hasSameFields } from './target.utils';

export const getBody = (
  annotation: Pick<W3CAnnotation, 'body'>,
): W3CAnnotationBody[] => {
  if (!annotation.body) return [];

  return Array.isArray(annotation.body) ? annotation.body : [annotation.body];
};
export const findBodyType = <B extends W3CAnnotationBody>(
  type: W3CAnnotationBodyType,
  validator: (body: B) => boolean,
) => {
  return (annotation: Pick<W3CAnnotation, 'body'>): B | undefined => {
    return getBody(annotation).find(
      (b: any) => b.type === type && validator(b),
    ) as unknown as B;
  };
};

export const findTagging = (annotation: W3CAnnotation) => {
  return findBodyType<TextualBodyClassifying>(
    'TextualBody',
    (body: TextualBodyClassifying) => body.purpose === 'tagging',
  )(annotation);
};

export const isSameBody = (
  body1: W3CAnnotationBody,
  body2: W3CAnnotationBody,
) => {
  if (!hasSameFields<any>(body1, body2, ['source', 'type'])) return false;

  return true;
};

export const updateBody = (
  annotation: W3CAnnotation,
  body: W3CAnnotationBody,
) => {
  const bodies = getBody(annotation).filter((t) => !isSameBody(t, body));

  bodies.push(body);
  annotation.body = bodies;

  return annotation;
};
