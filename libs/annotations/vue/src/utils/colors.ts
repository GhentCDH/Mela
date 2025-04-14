import type { AnnotationColor } from '@ghentcdh/vue-component-annotated-text';

// TODO export the one from @ghentcdh/vue-component-annotated-text when new release is available

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
