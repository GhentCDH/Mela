import { z } from 'zod';

import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/json-forms/core';
import { ExampleForm } from '@ghentcdh/mela/generated/forms';
import type {
  ExampleWithRelations} from '@ghentcdh/mela/generated/types';
import {
  ExampleSchema,
  RegisterSchema,
  TextContentSchema,
  TextSchema,
} from '@ghentcdh/mela/generated/types';

import { RegisterFormSchema } from '../register/register.schema';

const uiSchema = LayoutBuilder.vertical<ExampleWithRelations>()
  .addControls(
    ControlBuilder.asObject('register').autocomplete({
      uri: `${RegisterFormSchema.schema.uri}?filter=name:`,
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
  textContent: TextContentSchema.pick({ id: true, language: true }),
  text: TextSchema.pick({ id: true }),
  annotationTarget: TextContentSchema.pick({ id: true }),
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
