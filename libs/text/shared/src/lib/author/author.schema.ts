import { AuthorForm } from '@ghentcdh/mela/generated/forms';
import { AuthorSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/tools/form';

const uiSchema = LayoutBuilder.vertical()
  .addControls(ControlBuilder.scope('#/properties/name'))
  .build();

const tableSchema = TableBuilder.init()
  .addControls(
    TextCellBuilder.scope('#/properties/id'),
    TextCellBuilder.scope('#/properties/name'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical()
  .addControls(ControlBuilder.scope('#/properties/name'))
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
