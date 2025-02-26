import {
  ControlBuilder,
  createSchema,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
} from '@ghentcdh/json-forms/core';
import { ExampleForm } from '@ghentcdh/mela/generated/forms';
import {
  ExampleSchema,
  ExampleWithRelations,
  RegisterSchema,
} from '@ghentcdh/mela/generated/types';
import { z } from 'zod';
import { RegisterFormSchema } from '../register/register.schema';

const uiSchema = LayoutBuilder.vertical<ExampleWithRelations>()
  .addControls(
    ControlBuilder.asObject('register').autocomplete({
      uri: `${RegisterFormSchema.schema.uri}?filter=name`,
      uriDetail: RegisterFormSchema.schema.uri,
      field: {
        id: 'id',
        label: 'name',
      },
    }),
  )
  .build();

const tableSchema = TableBuilder.init<ExampleWithRelations>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('name'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical<ExampleWithRelations>()
  .addControls(ControlBuilder.properties('name'))
  .build();

const dtoSchema = ExampleSchema.pick({
  name: true,
}).extend({
  register: RegisterSchema.extend({
    id: z.string().optional(),
  }),
});

export type ExampleDto = z.infer<typeof dtoSchema>;

export const ExampleFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  jsonSchema: ExampleForm,
  tableSchema,
  uri: '/api/example',
});
