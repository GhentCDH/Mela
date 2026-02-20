import { pick } from 'lodash-es';
import { z } from 'zod';

import {
  W3CAnnotationBodySchema,
  W3CAnnotationTargetSchema,
} from '@ghentcdh/annotated-text';
import type { AnnotationBody, AnnotationTarget } from '@mela/generated-types';
import {
  AnnotationBodySchema,
  AnnotationSchema,
  AnnotationTargetSchema,
} from '@mela/generated-types';

import { createUri } from '../utils/uri';

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
  id: true,
  text_id: true,
}).extend({
  body: z.array(W3CAnnotationBodySchema),
  target: z.array(W3CAnnotationTargetSchema),
});

export const mapAnnotationPart = (data: AnnotationBody | AnnotationTarget) => {
  const { source_type, source_id, value } = data as any;
  const source = createUri(source_type)({ id: source_id });

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
      ...pick(data, ['id', 'motivation', '@context']),
      body: data.annotationBody?.map(mapAnnotationPart),
      target: data.annotationTarget?.map(mapAnnotationPart),
    };
  });

export const MelaAnnotationPageSchema = z.object({
  '@context': AnnotationContext,
  type: z.enum(['AnnotationPage']).default('AnnotationPage'),
  items: z.array(MelaAnnotationReturnSchema),
});

export type MelaAnnotationPage = z.infer<typeof MelaAnnotationPageSchema>;

export const AnnotationFormSchema = {
  schema: {
    uri: '/api/annotation',
  },
};
