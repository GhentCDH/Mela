import {
  ControlBuilder,
  createSchema,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
} from '@ghentcdh/json-forms-core';
import { RegisterForm } from '@mela/generated-forms';
import type { Register } from '@mela/generated-types';
import { RegisterSchema } from '@mela/generated-types';

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
