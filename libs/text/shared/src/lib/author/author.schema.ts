import { AuthorForm } from '@ghentcdh/mela/generated/forms';
import { AuthorSchema } from '@ghentcdh/mela/generated/types';
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
  .addControls(ControlBuilder.scope('#/properties/name'))
  .build();

const tableSchema = TableBuilder.init()
  .addControls(
    TextCellBuilder.scope('#/properties/id'),
    TextCellBuilder.scope('#/properties/name'),
  )
  .build();

const dtoSchema = AuthorSchema.pick({
  name: true,
});

const schema = createSchema({
  uiSchema,
  dtoSchema,
  jsonSchema: AuthorForm,
  tableSchema,
  uri: '/api/author',
});

export const authorFormSchema = schema.schema;

export class CreateAuthorDto extends schema.dto {}

export class ListAuthorDto extends createResponseData(AuthorSchema) {}
