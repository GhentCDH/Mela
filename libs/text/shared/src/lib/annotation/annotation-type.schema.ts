import { z } from 'zod';

import {
  AnnotationSchema,
  ExampleSchema,
  LemaSchema,
  RegisterSchema,
  TextContentSchema,
  TextSchema,
} from '@ghentcdh/mela/generated/types';

export const PURPOSE_ANNOTATION_SELECT = 'AnnotationSelector';
export const PURPOSE_EXAMPLE = 'AnnotationExample';
export const PURPOSE_TRANSLATION = 'translation';
export const PURPOSE_LEMA = 'lema';
export const PURPOSE_LINK_BUCKETS = 'link_buckets';

export const AnnotationSelectorSchema = z.object({
  annotation: z.object({
    id: z.string().optional(),
    tagging: z.string().optional(),
    start: z.number(),
    end: z.number(),
  }),
  textContent: TextContentSchema.pick({ id: true }),
  type: z.enum([PURPOSE_ANNOTATION_SELECT]).default(PURPOSE_ANNOTATION_SELECT),
});
export type AnnotationSelector = z.infer<typeof AnnotationSelectorSchema>;

export const AnnotationExampleExampleSchema = z.object({
  register: RegisterSchema.omit({ createdAt: true, updatedAt: true }).extend({
    id: z.string().optional(),
  }),
  id: z.string().optional(),
});

export type AnnotationExampleExample = z.infer<
  typeof AnnotationExampleExampleSchema
>;

export const AnnotationExampleSchema = AnnotationSelectorSchema.extend({
  example: AnnotationExampleExampleSchema,
  type: z.enum([PURPOSE_EXAMPLE]).default(PURPOSE_EXAMPLE),
});
export type AnnotationExample = z.infer<typeof AnnotationExampleSchema>;

export const LinkSchema = z.object({
  annotations: z.array(AnnotationSchema.pick({ id: true })),
  text: TextSchema.pick({ id: true }),
  type: z.string(),
  value: z.any().optional(),
});

export const TranslationExampleSchema = LinkSchema.extend({
  type: z.enum([PURPOSE_TRANSLATION]).default(PURPOSE_TRANSLATION),
});
export const LinkBucketsSchema = LinkSchema.extend({
  type: z.enum([PURPOSE_LINK_BUCKETS]).default(PURPOSE_LINK_BUCKETS),
});

export const AnnotationExampleLemaSchema = z.object({
  annotation: z.object({
    id: z.string().optional(),
    tagging: z.string().optional(),
    start: z.number(),
    end: z.number(),
  }),
  example: ExampleSchema.pick({ id: true }),
  lema: LemaSchema.pick({ name: true }).extend({
    id: z.string().optional(),
  }),
  id: z.string().optional(),
  textContent: TextContentSchema.pick({ id: true }),
  type: z.enum([PURPOSE_LEMA]).default(PURPOSE_LEMA),
});
export type AnnotationExampleLema = z.infer<typeof AnnotationExampleLemaSchema>;

export const AnnotationTypeSchema = AnnotationSelectorSchema.or(
  AnnotationExampleSchema,
)
  .or(TranslationExampleSchema)
  .or(LinkBucketsSchema)
  .or(AnnotationExampleExampleSchema);

export type AnnotationLink = z.infer<typeof LinkSchema>;
export type AnnotationType = z.infer<typeof AnnotationTypeSchema>;
