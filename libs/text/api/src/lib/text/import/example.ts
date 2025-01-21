import { WorkSheet } from 'xlsx';
import { z } from 'zod';

import {
  type ExampleLemaWithRelations,
  ExampleSchema,
  ExampleWithRelations,
  RelatedExampleWithRelations,
} from '@ghentcdh/mela/generated/types';

import { parseSheet } from './utils';

const booleanEnum = () => z.enum(['Yes', 'No']).transform((v) => v === 'Yes');

export const ExampleImportSchema = ExampleSchema.pick({
  mela_id: true,
  example: true,
  translation: true,
}).extend({
  phrase_nbr: z.string(),
  register: z.string(),
  lema_1: z.string().optional(),
  lema_2: z.string().optional(),
  lema_3: z.string().optional(),
  lema_4: z.string().optional(),
  lema_5: z.string().optional(),
  lema_6: z.string().optional(),
  lema_7: z.string().optional(),
  lema_8: z.string().optional(),
  lema_9: z.string().optional(),
  semantic_topic: z.string().optional(),
  gramatical_topic_specific: z.string().optional(),
  gramatical_topic_overarching: z.string().optional(),
  related_1: z.string().optional(),
  related_2: z.string().optional(),
  related_3: z.string().optional(),
  parallel_passage: z.string().optional(),
});

type ExampleImport = z.infer<typeof ExampleImportSchema>;

export const ExampleDictionary: Record<keyof ExampleImport, string> = {
  mela_id: 'Number of Entry in MELA database',

  phrase_nbr: 'Number of Phrase',
  example: 'Greek Example',
  register:
    'Related Register (=Register to which the Greek Example in Column C belongs)',
  lema_1: 'Lemma of important word 1',
  lema_2: 'Lemma of important word 2',
  lema_3: 'Lemma of important word 3',
  lema_4: 'Lemma of important word 4',
  lema_5: 'Lemma of important word 5',
  lema_6: 'Lemma of important word 6',
  lema_7: 'Lemma of important word 7',
  lema_8: 'Lemma of important word 8',
  lema_9: 'Lemma of important word 9',
  translation:
    'Translation of the Greek Example into English (= you can copy the translation form the previous excel file "TRANSLATION)"',
  semantic_topic: 'Semantic topic',
  gramatical_topic_specific: 'Grammatical Topic (specific)',
  gramatical_topic_overarching: 'Grammatical Topic (overarching)',
  related_1:
    'Related Entry (= here you write the number of entry which is related to the Greek Example in clumn C) add as many columns as you need, always named Related Entry',
  related_2:
    'Second related entry (= here I put in a separate column further relations given in text)',
  related_3: 'Third related entry (=same pattern)',
  parallel_passage:
    'Parallel Passages (= here you can write any passage from the Greek literature that may be related to the Greek Example in column C. Add as many columns as you need, considering that each example must stay in a separate column)',
} as const;

const mapLemas = (data: ExampleImport): ExampleLemaWithRelations[] => {
  return [
    { name: data.lema_1 },
    { name: data.lema_2 },
    { name: data.lema_3 },
    { name: data.lema_4 },
    { name: data.lema_5 },
    { name: data.lema_6 },
    { name: data.lema_7 },
    { name: data.lema_8 },
    { name: data.lema_9 },
  ]
    .filter((l) => !!l.name)
    .map((l, index) => ({ ...l, importance: index }));
};

const mapRelatedExamples = (
  data: ExampleImport,
): RelatedExampleWithRelations[] => {
  return [
    { name: data.related_1 },
    { name: data.related_2 },
    { name: data.related_3 },
  ]
    .filter((l) => !!l.name)
    .map((l, index) => ({ ...l, importance: index }));
};
const mapGrammaticalTopics = (data: ExampleImport) => {
  return [
    {
      type: 'specific',
      grammatical_top: { name: data.gramatical_topic_specific },
    },
    {
      type: 'overarching',
      grammatical_top: { name: data.gramatical_topic_overarching },
    },
  ].filter((l) => !!l.grammatical_top.name);
};

// TODO still mapping to the right phrase is needed!
export const parseExamples = (sheet: WorkSheet) => {
  const schema = ExampleImportSchema.transform((data) => {
    return {
      ...data,
      exampleLemas: mapLemas(data),
      related_examples: mapRelatedExamples(data),
      register: { name: data.register },
      semantic_topic: { name: data.semantic_topic },
      gramatical_topics: mapGrammaticalTopics,
      parallel_passage: { pasage: data.parallel_passage },
    } as ExampleWithRelations;
  });
  const Examples = parseSheet(sheet, ExampleDictionary, schema);

  return Examples;
};
