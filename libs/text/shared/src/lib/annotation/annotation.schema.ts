import { z } from 'zod';

import { AnnotationSchema } from '@ghentcdh/mela/generated/types';

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

export const AnnotationContext = z
  .enum(['http://www.w3.org/ns/anno.jsonld'])
  .default('http://www.w3.org/ns/anno.jsonld');

export const MelaAnnotationSchema = AnnotationSchema.omit({
  body: true,
  target: true,
  id: true,
  text_id: true,
}).extend({
  body: z.array(AnnotationTypeBody.or(TextualBodySchema)),
  target: z.array(TextTargetSchema),
});

export const MelaAnnotationReturnSchema = MelaAnnotationSchema.extend({
  id: z.string(),
  '@context': AnnotationContext,
});

export const MelaAnnotationPageSchema = z
  .object({
    '@context': AnnotationContext,
    type: z.enum(['AnnotationPage']).default('AnnotationPage'),
    items: z.array(AnnotationSchema),
  })
  .transform((data) => {
    return {
      ...data,
      items: data.items.map((item) => MelaAnnotationReturnSchema.parse(item)),
    };
  });
export type MelaAnnotationPage = z.infer<typeof MelaAnnotationPageSchema>;

export const W3CAnnotationSchema = z.object({
  id: z.string(),
  '@context': z.string(),
  motivation: z.enum(['classifying', 'tagging']).default('classifying'),
  body: z.array(AnnotationTypeBody.or(TextualBodySchema)),
  target: z.array(TextTargetSchema),
});
export type W3CAnnotation = z.infer<typeof W3CAnnotationSchema>;

export const AnnotationFormSchema = {
  schema: {
    uri: '/api/annotation',
  },
};
