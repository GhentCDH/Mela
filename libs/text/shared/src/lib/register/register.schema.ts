import { RegisterForm } from '@ghentcdh/mela/generated/forms';
import type { Register } from '@ghentcdh/mela/generated/types';
import { RegisterSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/tools/form';

const uiSchema = LayoutBuilder.vertical<Register>()
  .addControls(ControlBuilder.properties('name'))
  .build();

const tableSchema = TableBuilder.init<Register>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('name'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical<Register>()
  .addControls(ControlBuilder.properties('name'))
  .build();

const dtoSchema = RegisterSchema.pick({
  name: true,
});

export const RegisterFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  jsonSchema: RegisterForm,
  tableSchema,
  uri: '/api/register',
});
