import { z } from 'zod';

const SourceTypesList = ['text'] as const;

export type SourceTypes = (typeof SourceTypesList)[number];

export const SourceTextSchema = z.object({
  text: z.string(),
  textDirection: z.enum(['ltr', 'rtl']).default('ltr'),
  processingLanguage: z.string().default('en'),
});

export const SourceModelSchema = z.object({
  id: z.string(),
  uri: z.string(),
  type: z.enum(SourceTypesList),
  content: SourceTextSchema,
});

export type SourceModel = z.infer<typeof SourceModelSchema>;
