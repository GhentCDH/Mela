import { SpeechForm } from '@generated/forms';
import type { Speech } from '@generated/types';
import { SpeechSchema } from '@generated/types';

import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/json-forms/core';

const uiSchema = LayoutBuilder.vertical<Speech>()
  .addControls(ControlBuilder.properties('name'))
  .build();

const tableSchema = TableBuilder.init<Speech>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('name'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical<Speech>()
  .addControls(ControlBuilder.properties('name'))
  .build();

const dtoSchema = SpeechSchema.pick({
  name: true,
});

export const SpeechFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  jsonSchema: SpeechForm,
  tableSchema,
  uri: '/api/speech',
});
