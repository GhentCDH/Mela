import type { W3CAnnotation } from '@ghentcdh/annotated-text';
import { findTagging } from '@ghentcdh/annotated-text';

export type AnnotationType =
  | 'title'
  | 'subtitle'
  | 'paragraph'
  | 'phrase'
  | 'example'
  | 'lemma'
  | 'subsection';

export const allowedChildrenPerType: Record<string, string[]> = {
  example: ['lemma'],
  lemma: [],
  paragraph: ['phrase', 'title', 'subtitle'],
  phrase: ['example'],
  subsection: ['phrase', 'title', 'subtitle'],
  subtitle: ['example'],
  title: ['example'],
};

export const allowedLinksPerType: Record<
  string,
  Array<'translate' | 'link_buckets'>
> = {
  example: ['link_buckets'],
  lemma: ['translate'],
  paragraph: ['translate'],
  phrase: ['translate'],
  subsection: ['translate'],
};

export const AnnotationTypeLabelValue: Record<
  AnnotationType,
  { key: AnnotationType; label: string }
> = {
  title: { key: 'title', label: 'Title' },
  subtitle: { key: 'subtitle', label: 'SubTitle' },
  paragraph: { key: 'paragraph', label: 'Paragraph' },
  phrase: { key: 'phrase', label: 'Phrase' },
  example: { key: 'example', label: 'Example' },
  lemma: { key: 'lemma', label: 'Lemma' },
  subsection: { key: 'subsection', label: 'Sub-section' },
} as const;

export const AnnotationTypeLabelValues = Object.values(
  AnnotationTypeLabelValue,
);

export const isParagraphAnnotationType = (annotation: W3CAnnotation) => {
  return findTagging(annotation).value === 'paragraph';
};
