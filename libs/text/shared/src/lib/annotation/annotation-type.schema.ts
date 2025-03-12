import { z } from 'zod';

import {
  AnnotationSchema,
  RegisterSchema,
  TextContentSchema,
  TextSchema,
} from '@ghentcdh/mela/generated/types';

export const PURPOSE_ANNOTATION_SELECT = 'AnnotationSelector';
export const PURPOSE_EXAMPLE = 'AnnotationExample';
export const PURPOSE_TRANSLATION = 'translation';

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
  register: RegisterSchema.extend({
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
});

export const TranslationExampleSchema = LinkSchema.extend({
  type: z.enum([PURPOSE_TRANSLATION]).default(PURPOSE_TRANSLATION),
});

export const AnnotationTypeSchema = AnnotationSelectorSchema.or(
  AnnotationExampleSchema,
).or(TranslationExampleSchema);

export type AnnotationLink = z.infer<typeof LinkSchema>;
export type AnnotationType = z.infer<typeof AnnotationTypeSchema>;
