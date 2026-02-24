import {
  ControlBuilder,
  createSchema,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
} from '@ghentcdh/json-forms-core';
import type { Author } from '@mela/generated-types';
import { AuthorSchema } from '@mela/generated-types';

const uiSchema = LayoutBuilder.vertical<Author>()
  .addControls(ControlBuilder.properties('name'))
  .build();

const tableSchema = TableBuilder.init<Author>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('name'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical<Author>()
  .addControls(ControlBuilder.properties('name'))
  .build();

const dtoSchema = AuthorSchema.pick({
  name: true,
});

export const AuthorFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  tableSchema,
  schema: AuthorSchema,
  uri: '/author',
});
