import {
  createHighlightStyle,
  CustomAnnotationStyle,
  findTagging,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import memoizee from 'memoizee';
import { AnnotationType } from '../views/work/text-index/controls/identify.color';

export const annotationStyles: Record<
  AnnotationType | 'default',
  CustomAnnotationStyle
> = {
  title: {
    default: createHighlightStyle('#dd7777'),
  },
  subtitle: {
    default: createHighlightStyle('#FFB74D'),
  },
  default: {
    default: createHighlightStyle('#4d88ff'),
  },
  paragraph: {
    default: createHighlightStyle('#4d88ff'),
  },
  subsection: {
    default: createHighlightStyle('#4d88ff'),
  },
  phrase: {
    default: createHighlightStyle('#9d1bd8'),
  },
  example: {
    default: createHighlightStyle('#4fff66'),
  },
  lemma: {
    default: createHighlightStyle('#7a8800'),
  },
} as const;

export const findPurpose = (a: W3CAnnotation) => {
  return findTagging(a)?.value?.trim() ?? null;
};

export const _findPurposeLowerCase = memoizee((purpose: string) => {
  const _purpose = purpose?.toLowerCase().trim() ?? 'default';
  // if (annotationPurposeValues.includes(_purpose as annotationPurpose)) {
  //   return _purpose as annotationPurpose;
  // }
  return purpose.toLowerCase() ?? 'default';
  return 'default';
});

export const findPurposeLowerCase = (a: W3CAnnotation) => {
  const purpose = findPurpose(a);
  return _findPurposeLowerCase(purpose ?? 'default');
};

export const defaultRender = (annotation: W3CAnnotation): string | null => {
  const purpose = findPurposeLowerCase(annotation) as unknown as AnnotationType;
  const gutterPurposes: AnnotationType[] = ['paragraph', 'subsection'];
  console.log('default renderer', purpose, gutterPurposes.includes(purpose));
  return gutterPurposes.includes(purpose) ? 'gutter' : 'underline';
};

export const defaultStyle = (
  annotation: W3CAnnotation,
): CustomAnnotationStyle | null => {
  return findPurposeLowerCase(annotation);
};
