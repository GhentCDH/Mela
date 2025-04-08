import { z } from 'zod';

import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/json-forms/core';
import { LemmaForm } from '@ghentcdh/mela/generated/forms';
import type { Lemma } from '@ghentcdh/mela/generated/types';
import { LemmaSchema, SpeechSchema } from '@ghentcdh/mela/generated/types';

const uiSchema = LayoutBuilder.vertical<Lemma>()
  .addControls(
    ControlBuilder.properties('word'),
    ControlBuilder.properties('link'),
    ControlBuilder.asObject('speech').autocomplete({
      uri: '/api/speech?filter=name:',
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
  speech: SpeechSchema.omit({ createdAt: true, updatedAt: true }).extend({
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
  uri: '/api/lemma',
  searchUri: '/api/lemma?filter=word:',
  modalSize: 'lg',
});
