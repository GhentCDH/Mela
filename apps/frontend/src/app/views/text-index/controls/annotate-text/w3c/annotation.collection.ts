import { z } from 'zod';

import { W3CAnnotationSchema } from './types';

export const AnnotationPageSchema = z.object({
  '@context': z
    .enum(['http://www.w3.org/ns/anno.jsonld'])
    .default('http://www.w3.org/ns/anno.jsonld'),
  id: z.string(),
  type: z.enum(['AnnotationPage']).default('AnnotationPage'),
  // partOf: z.object({
  //   id: z.string(),
  //   label: z.string(),
  //   total: z.number(),
  // }),
  // next: z.string(),
  // startIndex: z.number(),
  items: z.array(W3CAnnotationSchema),
});

export type AnnotationPage = z.infer<typeof AnnotationPageSchema>;
