import { z } from 'zod';

import {
  W3CAnnotationBodySchema,
  W3CAnnotationTargetSchema,
} from '@ghentcdh/annotations/core';
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

export const AnnotationContext = z
  .enum(['http://www.w3.org/ns/anno.jsonld'])
  .default('http://www.w3.org/ns/anno.jsonld');

export const MelaAnnotationSchema = AnnotationSchema.omit({
  body: true,
  target: true,
  id: true,
  text_id: true,
}).extend({
  body: z.array(W3CAnnotationBodySchema),
  target: z.array(W3CAnnotationTargetSchema),
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

export const AnnotationFormSchema = {
  schema: {
    uri: '/api/annotation',
  },
};
