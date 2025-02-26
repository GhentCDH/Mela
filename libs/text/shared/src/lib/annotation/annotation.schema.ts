import { z } from 'zod';

import {
  W3CAnnotationBodySchema,
  W3CAnnotationTargetSchema,
} from '@ghentcdh/annotations/core';
import type {
  AnnotationBody,
  AnnotationTarget,
} from '@ghentcdh/mela/generated/types';
import {
  AnnotationBodySchema,
  AnnotationSchema,
  AnnotationTargetSchema,
} from '@ghentcdh/mela/generated/types';

import { getTextContentUri } from '../utils/uri';

export const AnnotationMetadataTypes = z.enum([
  'title',
  'subtitle',
  'phrase',
  'paragraph',
  'no-link', // This text is not lined yet to some of the source part
  'example',
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

export const mapAnnotationPart = (data: AnnotationBody | AnnotationTarget) => {
  const value = JSON.parse(data.value);
  let source = undefined;
  if (data.source_id) source = getTextContentUri({ id: data.source_id });
  return { ...value, source };
};

export const MelaAnnotationReturnSchema = AnnotationSchema.pick({
  id: true,
  motivation: true,
})
  .extend({
    '@context': AnnotationContext,
    annotationBody: z.array(AnnotationBodySchema).optional(),
    annotationTarget: z.array(AnnotationTargetSchema).optional(),
  })
  .transform((data) => {
    return {
      ...data,
      body: data.annotationBody?.map(mapAnnotationPart),
      target: data.annotationTarget?.map(mapAnnotationPart),
      mapAnnotationTarget: undefined,
      mapAnnotationBody: undefined,
    };
  });

export const MelaAnnotationPageSchema = z
  .object({
    '@context': AnnotationContext,
    type: z.enum(['AnnotationPage']).default('AnnotationPage'),
    items: z.array(MelaAnnotationReturnSchema),
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
