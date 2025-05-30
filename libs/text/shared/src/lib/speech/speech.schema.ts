import { ControlBuilder, LayoutBuilder, TableBuilder, TextCellBuilder, createSchema } from '@ghentcdh/json-forms/core';
import { SpeechForm } from '@ghentcdh/mela/generated/forms';
import type { Speech } from '@ghentcdh/mela/generated/types';
import { SpeechSchema } from '@ghentcdh/mela/generated/types';

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
