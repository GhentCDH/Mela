import { z } from 'zod';

import {
  ControlBuilder,
  createSchema,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
} from '@ghentcdh/json-forms-core';
import { LemmaForm } from '@mela/generated-forms';
import type { Lemma } from '@mela/generated-types';
import { LemmaSchema, SpeechSchema } from '@mela/generated-types';

const uiSchema = LayoutBuilder.vertical<Lemma>()
  .addControls(
    ControlBuilder.properties('word'),
    ControlBuilder.properties('link'),
    ControlBuilder.asObject('speech').autocomplete({
      uri: '/speech?filter=name:',
      field: {
        id: 'id',
        label: 'name',
      },
    }),
    LayoutBuilder.horizontal<Lemma>().addControls(
      ControlBuilder.properties('grammatical'),
      ControlBuilder.properties('comparative'),
      ControlBuilder.properties('superlative'),
      ControlBuilder.properties('participle'),
    ),
  )
  .build();

const tableSchema = TableBuilder.init<Lemma>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('word'),
    TextCellBuilder.properties('speech').key('name').setSortId('speech.name'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical<Lemma>()
  .addControls(ControlBuilder.properties('word'))
  .build();

const dtoSchema = LemmaSchema.pick({
  word: true,
  link: true,
  grammatical: true,
  comparative: true,
  superlative: true,
  participle: true,
}).extend({
  speech: SpeechSchema.omit({ created_at: true, updated_at: true }).extend({
    id: z.string().optional(),
  }),
  grammatical: z.boolean().optional().default(false),
  comparative: z.boolean().optional().default(false),
  superlative: z.boolean().optional().default(false),
  participle: z.boolean().optional().default(false),
});

export const LemmaFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  jsonSchema: LemmaForm,
  tableSchema,
  uri: '/lemma',
  searchUri: '/lemma?filter=word:',
  modalSize: 'lg',
});
