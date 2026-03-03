import type { W3CAnnotation } from '@ghentcdh/annotated-text';
import { findTagging } from '@ghentcdh/annotated-text';

export type AnnotationType =
  | 'title'
  | 'subtitle'
  | 'paragraph'
  | 'phrase'
  | 'example'
  | 'lemma'
  | 'sub-section';

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
  'sub-section': { key: 'sub-section', label: 'Sub-section' },
} as const;

export const AnnotationTypeLabelValues = Object.values(
  AnnotationTypeLabelValue,
);

export const isParagraphAnnotationType = (annotation: W3CAnnotation) => {
  console.log('is paragraph annotation type:');
  console.log(findTagging(annotation));
  return findTagging(annotation).value === 'paragraph';
};

// export const IdentifyColorMap = createAnnotationColors(Colors, {
//   opacity: {
//     background: 0.2,
//     border: 0.8,
//     backgroundActive: 0.4,
//     borderActive: 0.9,
//     gutter: 0.8,
//   },
// });
//
// export const colorForAnnotationType: ColorFn<W3CAnnotation> = (
//   w3cAnnotation: W3CAnnotation,
// ) => {
//   const type = findTagging(w3cAnnotation);
//   return IdentifyColorMap[type?.value ?? 'paragraph'];
// };
