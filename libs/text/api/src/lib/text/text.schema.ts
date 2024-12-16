import { TextForm } from '@ghentcdh/mela/generated/forms';
import { TextSchema } from '@ghentcdh/mela/generated/types';
import { SchemaModel, createSchema } from '@ghentcdh/tools/form';

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
          scope: '#/properties/name',
        },
        {
          type: 'Control',
          scope: '#/properties/author_id',
        },
        {
          type: 'Control',
          scope: '#/properties/year',
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
    scope: '#/properties/name',
  },
  {
    scope: '#/properties/year',
  },
  {
    scope: '#/properties/author',
  },
];

const dtoSchema = TextSchema.pick({
  name: true,
  author_id: true,
  mela_id: true,
  year: true,
});

const formSchema = createSchema({
  uiSchema,
  dtoSchema,
  jsonSchema: TextForm,
  uri: '/api/text',
  columnDef,
});

export const textSchema: SchemaModel = formSchema.schema;

export class CreateTextDto extends formSchema.dto {}
