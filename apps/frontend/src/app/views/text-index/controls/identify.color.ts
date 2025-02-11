import { createAnnotationColors } from '@ghentcdh/vue-component-annotated-text';

const Colors = {
  title: '#dd7777', // pastel red
  subtitle: '#FFB74D', // pastel orange
  paragraph: '#4d88ff', // pastel blue
  phrase: '#CAB2D6', // pastel green
};

export const IdentifyColorMap = createAnnotationColors(Colors);

export const IdentifyColor = [
  { label: 'Title', id: 'title' },
  { label: 'SubTitle', id: 'subtitle' },
  { label: 'Paragraph', id: 'paragraph' },
  { label: 'Phrase', id: 'phrase' },
] as const;
