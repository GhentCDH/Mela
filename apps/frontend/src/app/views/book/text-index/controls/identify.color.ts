import { createAnnotationColors } from '@ghentcdh/annotations/vue';

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

const Colors: Record<AnnotationType, string> = {
  title: '#dd7777', // pastel red
  subtitle: '#FFB74D', // pastel orange
  paragraph: '#4d88ff', // pastel blue
  phrase: '#CAB2D6', // pastel purple
  example: '#4fff66', // pastel green
  lemma: '#f2ff64', // pastel yellow
};

export const IdentifyColorMap = createAnnotationColors(Colors, {
  opacity: {
    background: 0.2,
    border: 0.3,
    backgroundActive: 0.4,
    borderActive: 0.9,
    gutter: 0.8,
  },
});
