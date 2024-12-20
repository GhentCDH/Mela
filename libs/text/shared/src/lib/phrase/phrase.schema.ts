import { PhraseForm } from '@ghentcdh/mela/generated/forms';
import { PhraseSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
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
      ControlBuilder.scope('#/properties/phrase_nbr')
    ),
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.scope('#/properties/text').textArea(),
      ControlBuilder.scope('#/properties/translation').textArea()
    )
  )
  .build();

const columnDef = [
  {
    scope: '#/properties/id',
  },
  {
    scope: '#/properties/mela_id',
  },
  {
    scope: '#/properties/text',
  },
];

const dtoSchema = PhraseSchema.pick({
  mela_id: true,
  book_nbr: true,
  chapter_nbr: true,
  phrase_nbr: true,
  text_id: true,
  source_text: true,
  translation: true,
});

export const schema = createSchema({
  uiSchema,
  dtoSchema,
  jsonSchema: PhraseForm,
  uri: '/api/phrase',
  columnDef,
});

export const phraseFormSchema = schema.schema;

export class CreatePhraseDto extends schema.dto {}

export class ListPhraseDto extends createResponseData(PhraseSchema) {}
