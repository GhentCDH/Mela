import { RegisterForm } from '@ghentcdh/mela/generated/forms';
import { RegisterSchema } from '@ghentcdh/mela/generated/types';
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
