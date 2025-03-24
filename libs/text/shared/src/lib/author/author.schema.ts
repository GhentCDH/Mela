import { AuthorForm } from '@generated/forms';
import type { Author } from '@generated/types';
import { AuthorSchema } from '@generated/types';

import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/json-forms/core';

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
  jsonSchema: AuthorForm,
  tableSchema,
  uri: '/api/author',
});
