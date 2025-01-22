import type { WorkSheet } from 'xlsx';
import { z } from 'zod';

import type { Phrase} from '@ghentcdh/mela/generated/types';
import { PhraseSchema } from '@ghentcdh/mela/generated/types';

import { parseSheet } from './utils';

export const PhraseImportSchema = PhraseSchema.pick({
  mela_id: true,
  phrase_nbr: true,
  source_text: true,
  translation: true,
}).extend({
  chapter_nbr: z.string().default('1'),
  book_nbr: z.string().default('1'),
});

type PhraseImport = z.infer<typeof PhraseImportSchema>;

export const PhraseDictionary: Record<keyof PhraseImport, string> = {
  mela_id: 'Number of Entry in MELA database',
  phrase_nbr: 'Number of Phrase',
  source_text: 'Greek Text',
  translation: 'English Translation of Column C',
} as const;

export const parsePhrases = (textId: string, sheet: WorkSheet) => {
  const schema = PhraseImportSchema.transform((data) => {
    return {
      ...data,
      text_id: textId,
    } as Phrase;
  });
  const phrases = parseSheet(sheet, PhraseDictionary, schema);

  return phrases;
};
