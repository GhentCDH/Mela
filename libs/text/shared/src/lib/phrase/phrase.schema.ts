import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/json-forms/core';
import { PhraseForm } from '@ghentcdh/mela/generated/forms';
import type { Phrase } from '@ghentcdh/mela/generated/types';
import { PhraseSchema } from '@ghentcdh/mela/generated/types';

// TODO add autocomplete for textschema

const uiSchema = LayoutBuilder.vertical<Phrase>()
  .addControls(
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.properties('book_nbr'),
      ControlBuilder.properties('chapter_nbr'),
      ControlBuilder.properties('phrase_nbr'),
    ),
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.properties('source_text').textArea(),
      ControlBuilder.properties('translation').textArea(),
    ),
  )
  .build();

const tableSchema = TableBuilder.init<Phrase>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('phrase_nbr'),
    TextCellBuilder.properties('source_text'),
  )
  .build();

const dtoSchema = PhraseSchema.pick({
  book_nbr: true,
  chapter_nbr: true,
  phrase_nbr: true,
  text_id: true,
  source_text: true,
  translation: true,
});

export const PhraseFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  jsonSchema: PhraseForm,
  uri: '/api/phrase',
  tableSchema,
});
