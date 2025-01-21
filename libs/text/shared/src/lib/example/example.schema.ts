import { z } from 'zod';

import { ExampleForm } from '@ghentcdh/mela/generated/forms';
import { ExampleSchema, SpeechSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createResponseData,
  createSchema,
} from '@ghentcdh/tools/form';

const uiSchema = LayoutBuilder.vertical()
  .addControls(
    ControlBuilder.scope('#/properties/example'),
    ControlBuilder.scope('#/properties/translation'),
  )
  .build();

const tableSchema = TableBuilder.init()
  .addControls(
    TextCellBuilder.scope('#/properties/id'),
    TextCellBuilder.scope('#/properties/example'),
    TextCellBuilder.scope('#/properties/register')
      .key('name')
      .setSortId('register.name'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical()
  .addControls(ControlBuilder.scope('#/properties/example'))
  .build();

const dtoSchema = ExampleSchema.pick({
  example: true,
  translation: true,
})
  // TODO add other fields
  .extend({ register: SpeechSchema.extend({ id: z.string().optional() }) });

const schema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  jsonSchema: ExampleForm,
  tableSchema,
  uri: '/api/example',
});

export const ExampleFormSchema = schema.schema;

export class CreateExampleDto extends schema.dto {}

export class ListExampleDto extends createResponseData(ExampleSchema) {}
