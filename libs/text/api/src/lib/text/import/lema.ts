import { WorkSheet } from 'xlsx';
import { z } from 'zod';

import { LemaSchema, LemaWithRelations } from '@ghentcdh/mela/generated/types';

import { parseSheet } from './utils';

const booleanEnum = () => z.enum(['Yes', 'No']).transform((v) => v === 'Yes');

export const LemaImportSchema = LemaSchema.pick({
  word: true,
  link: true,
}).extend({
  grammatical: booleanEnum(),
  comparative: booleanEnum(),
  superlative: booleanEnum(),
  participle: booleanEnum(),
  speech: z.string(),
});

type LemaImport = z.infer<typeof LemaImportSchema>;

export const LemaDictionary: Record<keyof LemaImport, string> = {
  word: 'Lemma of the main word of the Greek Example (it can also be a syntagma or phrase) = this is the key word(s) that the user can search for',
  link: 'Link to lemma (entered in column E)',
  speech: 'Part of speech',
  grammatical: 'Grammatical term',
  comparative: 'Comparative',
  superlative: 'Superlative',
  participle: 'Participle',
} as const;

export const parseLemas = (sheet: WorkSheet) => {
  const schema = LemaImportSchema.transform((data) => {
    return {
      ...data,
      speech: { name: data.speech },
    } as LemaWithRelations;
  });
  const lemas = parseSheet(sheet, LemaDictionary, schema);

  return lemas;
};
