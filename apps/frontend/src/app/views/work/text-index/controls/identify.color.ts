import type { ColorFn, W3CAnnotation } from '@ghentcdh/annotated-text';
import { createAnnotationColors, findTagging } from '@ghentcdh/annotated-text';

export type AnnotationType =
  | 'title'
  | 'subtitle'
  | 'paragraph'
  | 'phrase'
  | 'example'
  | 'lemma';

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
} as const;

export const AnnotationTypeLabelValues = Object.values(
  AnnotationTypeLabelValue,
);

export const isParagraphAnnotationType = (annotation: W3CAnnotation) => {
  return findTagging(annotation).value === 'paragraph';
};

const Colors: Record<AnnotationType, string> = {
  title: '#dd7777', // pastel red
  subtitle: '#FFB74D', // pastel orange
  paragraph: '#4d88ff', // pastel blue
  phrase: '#9d1bd8', // pastel purple
  example: '#4fff66', // pastel green
  lemma: '#7a8800', // pastel yellow
};

export const IdentifyColorMap = createAnnotationColors(Colors, {
  opacity: {
    background: 0.2,
    border: 0.8,
    backgroundActive: 0.4,
    borderActive: 0.9,
    gutter: 0.8,
  },
});

export const colorForAnnotationType: ColorFn<W3CAnnotation> = (
  w3cAnnotation: W3CAnnotation,
) => {
  const type = findTagging(w3cAnnotation);
  return IdentifyColorMap[type?.value ?? 'paragraph'];
};
