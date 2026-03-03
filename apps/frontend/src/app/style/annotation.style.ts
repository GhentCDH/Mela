import { createHighlightStyle, CustomAnnotationStyle, findTagging, W3CAnnotation } from '@ghentcdh/annotated-text';
import memoizee from 'memoizee';

const annotationPurposeValues = ['ancientterms', 'sourcesandreferences', 'default', 'recurringmetaphors', 'annotationcommentary', 'conceptsenglish'] as const;
export type annotationPurpose = typeof annotationPurposeValues[number];
export const annotationStyles: Record<annotationPurpose, CustomAnnotationStyle> = {
  'default': {
    default: createHighlightStyle('#dd7777'
    )
  },
  'ancientterms': {
    default: createHighlightStyle('#65a378'
    )
  },
  'sourcesandreferences': {
    default: createHighlightStyle('#1e55cf'
    )
  },
  'recurringmetaphors': {
    default: createHighlightStyle('#ff0000'
    )
  },
  'annotationcommentary': {
    default: createHighlightStyle('#f3ff4d'
    )
  },
  'conceptsenglish': {
    default: createHighlightStyle('#712793'
    )
  }

} as const;
export const annotationRender: Record<annotationPurpose, 'underline' | 'highlight'> = {
  'ancientterms': 'highlight',
  'sourcesandreferences': 'highlight',
  'recurringmetaphors': 'highlight',
  'annotationcommentary': 'highlight',
  'conceptsenglish': 'underline',
  'default': 'highlight'
} as const;


export const findPurpose = (a: W3CAnnotation) => {
  return findTagging(a)?.value?.trim() ?? null;
};

export const _findPurposeLowerCase = memoizee((purpose: string) => {
  const _purpose = purpose?.toLowerCase().trim() ?? 'default';
  if (annotationPurposeValues.includes(_purpose as annotationPurpose)) {
    return _purpose as annotationPurpose;
  }
  return 'default';
});

export const findPurposeLowerCase = (a: W3CAnnotation) => {
  const purpose = findPurpose(a);
  return _findPurposeLowerCase(purpose ?? 'default');
};

export const defaultRender = (annotation: W3CAnnotation): string | null => {
  const purpose = findPurposeLowerCase(annotation) as unknown as annotationPurpose;

  return annotationRender[purpose] ?? 'highlight';
};

export const defaultStyle = (annotation: W3CAnnotation): CustomAnnotationStyle | null => {

  return findPurposeLowerCase(annotation);
};
