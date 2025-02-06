import {
  type AnnotationColor,
  createAnnotationColor,
} from '@ghentcdh/vue-component-annotated-text';

export const IdentifyColor = [
  { label: 'Title', id: 'title', color: '#dd7777' }, // pastel red
  { label: 'SubTitle', id: 'subtitle', color: '#FFB74D' }, // pastel orange
  { label: 'Paragraph', id: 'paragraph', color: '#4d88ff' }, // pastel blue
  { label: 'Phrase', id: 'phrase', color: '#CAB2D6' }, // pastel green
] as const;

export const IdentifyColorMap = IdentifyColor.reduce(
  (acc, { id, color }) => {
    acc[id] = createAnnotationColor(color);
    return acc;
  },
  {} as Record<string, AnnotationColor>,
);
