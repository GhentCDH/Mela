import {
  CustomAnnotationStyle,
  findTagging,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import memoizee from 'memoizee';
import { AnnotationType } from '../views/work/text-index/controls/identify.color';

export const findPurpose = (a: W3CAnnotation) => {
  return findTagging(a)?.value?.trim() ?? null;
};

export const _findPurposeLowerCase = memoizee((purpose: string) => {
  return purpose.toLowerCase() ?? 'default';
});

export const findPurposeLowerCase = (a: W3CAnnotation) => {
  const purpose = findPurpose(a);
  return _findPurposeLowerCase(purpose ?? 'default');
};

export const defaultRender = (annotation: W3CAnnotation): string | null => {
  const purpose = findPurposeLowerCase(annotation) as unknown as AnnotationType;
  const gutterPurposes: AnnotationType[] = ['paragraph', 'subsection'];
  return gutterPurposes.includes(purpose) ? 'gutter' : 'underline';
};

export const defaultStyle = (
  annotation: W3CAnnotation,
): CustomAnnotationStyle | null => {
  return findPurposeLowerCase(annotation);
};
