import { z } from 'zod';

// TODO move all the types here

export const AnnotationMetadataTypes = z.enum([
  'title',
  'subtitle',
  'phrase',
  'paragraph',
  'no-link', // This text is not lined yet to some of the source part
]);
export type AnnotationMetadataType = z.infer<typeof AnnotationMetadataTypes>;
export const Languages = z.enum(['gr', 'en']);
export type Language = z.infer<typeof Languages>;

export const AnnotationTypeBody = z.object({
  type: z.enum(['AnnotationType']).default('AnnotationType'),
  textType: AnnotationMetadataTypes,
});

export const TextualBodySchema = z.object({
  type: z.enum(['TextualBody']).default('TextualBody'),
  format: z.enum(['text']).default('text'),
  language: Languages,
  value: z.string(),
});
export type TextualBody = z.infer<typeof TextualBodySchema>;

export const W3CAnnotationBodySchema = AnnotationTypeBody.or(TextualBodySchema);
export type W3CAnnotationBody = z.infer<typeof W3CAnnotationBodySchema>;

export const TextPositionSelectorSchema = z.object({
  type: z.enum(['TextPositionSelector']).default('TextPositionSelector'),
  start: z.number(),
  end: z.number(),
});

export const TextTargetSchema = z.object({
  source: z.string(),
  textDirection: z.enum(['ltr', 'rtl']),
  type: z.enum(['Text']).default('Text'),
  processingLanguage: Languages,
  selector: TextPositionSelectorSchema,
});

export const W3CAnnotationTargetSchema = TextTargetSchema;
export type W3CAnnotationTarget = z.infer<typeof W3CAnnotationTargetSchema>;

export const AnnotationContext = z
  .enum(['http://www.w3.org/ns/anno.jsonld'])
  .default('http://www.w3.org/ns/anno.jsonld');

export const W3CAnnotationSchema = z.object({
  id: z.string(),
  '@context': z.string(),
  motivation: z.enum(['classifying', 'tagging']).default('classifying'),
  body: z.array(W3CAnnotationBodySchema).or(W3CAnnotationBodySchema),
  target: z.array(W3CAnnotationTargetSchema).or(W3CAnnotationTargetSchema),
});
export type W3CAnnotation = z.infer<typeof W3CAnnotationSchema>;
