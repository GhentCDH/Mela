import { PhraseForm } from '@ghentcdh/mela/generated/forms';
import { PhraseSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlType,
  SchemaModel,
  createResponseData,
  createSchema,
} from '@ghentcdh/tools/form';

// TODO add autocomplete for textschema

const uiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/mela_id',
        },
        {
          type: 'Control',
          scope: '#/properties/book_nbr',
        },
        {
          type: 'Control',
          scope: '#/properties/chapter_nbr',
        },
        {
          type: 'Control',
          scope: '#/properties/phrase_nbr',
        },
      ],
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/source_text',
          options: {
            format: ControlType.textArea,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/translation',
          options: {
            format: ControlType.textArea,
          },
        },
      ],
    },
  ],
};

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

const formSchema = createSchema({
  uiSchema,
  dtoSchema,
  jsonSchema: PhraseForm,
  uri: '/api/phrase',
  columnDef,
});

export const phraseSchema: SchemaModel = formSchema.schema;

export class CreatePhraseDto extends formSchema.dto {}

export class ListPhraseDto extends createResponseData(PhraseSchema) {}
