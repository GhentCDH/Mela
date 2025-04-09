import type { AnnotationColor } from '@ghentcdh/vue-component-annotated-text';

// TODO use new one when new release is available

const Colors = {
  title: '#dd7777', // pastel red
  subtitle: '#FFB74D', // pastel orange
  paragraph: '#4d88ff', // pastel blue
  phrase: '#CAB2D6', // pastel purple
  example: '#4fff66', // pastel green
  lemma: '#f2ff64', // pastel yellow
};

const defaultConfig: any = {
  opacity: {
    background: 0.3,
    border: 0.3,
    backgroundActive: 0.3,
    borderActive: 0.9,
    gutter: 0.8,
  },
};
const hexToRgb = (hex: string): string => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r},${g},${b}`;
};

export const createAnnotationColor = (
  color: string,
  config?: any,
): AnnotationColor => {
  const opacity = { ...defaultConfig.opacity, ...config?.opacity };
  const rgbColor = hexToRgb(color);

  return {
    border: `rgba(${rgbColor},${opacity.border})`,
    background: `rgba(${rgbColor},${opacity.background})`,
    borderActive: `rgba(${rgbColor},${opacity.borderActive})`,
    backgroundActive: `rgba(${rgbColor},${opacity.backgroundActive})`,
    gutterColor: `rgba(${rgbColor},${opacity.gutter})`,
  };
};

export const createAnnotationColors = (
  colors: Record<string, string>,
  config?: any,
): Record<string, AnnotationColor> => {
  const colorSet: Record<string, AnnotationColor> = {};

  Object.entries(colors).forEach(([key, value]) => {
    colorSet[key] = createAnnotationColor(value, config);
  });

  return colorSet;
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
