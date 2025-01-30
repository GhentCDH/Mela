import { AuthorForm } from '@ghentcdh/mela/generated/forms';
import type { Author } from '@ghentcdh/mela/generated/types';
import { AuthorSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/tools/form';

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
