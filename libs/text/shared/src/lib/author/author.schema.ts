import { AuthorForm } from '@ghentcdh/mela/generated/forms';
import { AuthorSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
  createResponseData,
  createSchema,
} from '@ghentcdh/tools/form';

// TODO add autocomplete for textschema

const uiSchema = LayoutBuilder.vertical()
  .addControls(ControlBuilder.scope('#/properties/name'))
  .build();

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

export const authorFormSchema = schema.schema;

export class CreateAuthorDto extends schema.dto {}

export class ListAuthorDto extends createResponseData(AuthorSchema) {}
