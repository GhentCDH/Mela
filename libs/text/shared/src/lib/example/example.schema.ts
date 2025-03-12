import type { z } from 'zod';

import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/json-forms/core';
import { ExampleForm } from '@ghentcdh/mela/generated/forms';
import type { ExampleWithRelations } from '@ghentcdh/mela/generated/types';

import { AnnotationExampleExampleSchema } from '../annotation/annotation-type.schema';
import { RegisterFormSchema } from '../register/register.schema';

const uiSchema = LayoutBuilder.vertical<
  z.infer<typeof AnnotationExampleExampleSchema>
>()
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

export type ExampleDto = z.infer<typeof AnnotationExampleExampleSchema>;

export const ExampleFormSchema = createSchema({
  uiSchema,
  dtoSchema: AnnotationExampleExampleSchema,
  filterSchema,
  jsonSchema: ExampleForm,
  tableSchema,
  uri: '/api/example',
});
