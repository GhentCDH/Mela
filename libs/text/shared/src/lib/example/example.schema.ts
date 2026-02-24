import type { z } from 'zod';

import {
  ControlBuilder,
  createSchema,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
} from '@ghentcdh/json-forms-core';
import { ExampleSchema, ExampleWithRelations } from '@mela/generated-types';

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
  schema: ExampleSchema,
  tableSchema,
  uri: '/example',
});
