import { createAnnotationColors } from '@ghentcdh/annotations/vue';

const Colors = {
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

export const IdentifyColor = [
  { label: 'Title', id: 'title' },
  { label: 'SubTitle', id: 'subtitle' },
  { label: 'Paragraph', id: 'paragraph' },
  { label: 'Phrase', id: 'phrase' },
  { label: 'Example', id: 'example' },
  { label: 'Lemma', id: 'lemma' },
] as const;
