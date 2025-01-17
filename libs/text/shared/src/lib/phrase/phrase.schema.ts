import { PhraseForm } from '@ghentcdh/mela/generated/forms';
import { PhraseSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createResponseData,
  createSchema,
} from '@ghentcdh/tools/form';

// TODO add autocomplete for textschema

const uiSchema = LayoutBuilder.vertical()
  .addControls(
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.scope('#/properties/mela_id'),
      ControlBuilder.scope('#/properties/book_nbr'),
      ControlBuilder.scope('#/properties/chapter_nbr'),
      ControlBuilder.scope('#/properties/phrase_nbr'),
    ),
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.scope('#/properties/source_text').textArea(),
      ControlBuilder.scope('#/properties/translation').textArea(),
    ),
  )
  .build();

const tableSchema = TableBuilder.init()
  .addControls(
    TextCellBuilder.scope('#/properties/id'),
    TextCellBuilder.scope('#/properties/mela_id'),
    TextCellBuilder.scope('#/properties/phrase_nbr'),
    TextCellBuilder.scope('#/properties/source_text'),
  )
  .build();

const dtoSchema = PhraseSchema.pick({
  mela_id: true,
  book_nbr: true,
  chapter_nbr: true,
  phrase_nbr: true,
  text_id: true,
  source_text: true,
  translation: true,
});

const schema = createSchema({
  uiSchema,
  dtoSchema,
  jsonSchema: PhraseForm,
  uri: '/api/phrase',
  tableSchema,
});

export const phraseFormSchema = schema.schema;

export class CreatePhraseDto extends schema.dto {}

export class ListPhraseDto extends createResponseData(PhraseSchema) {}
