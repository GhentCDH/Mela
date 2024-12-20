import { AuthorForm } from '@ghentcdh/mela/generated/forms';
import { AuthorSchema } from '@ghentcdh/mela/generated/types';
import {
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
          scope: '#/properties/name',
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
    scope: '#/properties/name',
  },
];

const dtoSchema = AuthorSchema.pick({
  name: true,
});

const schema = createSchema({
  uiSchema,
  dtoSchema,
  jsonSchema: AuthorForm,
  uri: '/api/author',
  columnDef,
});

export const authorFormSchema: SchemaModel = schema.schema;

export class CreateAuthorDto extends schema.dto {}

export class ListAuthorDto extends createResponseData(AuthorSchema) {}
