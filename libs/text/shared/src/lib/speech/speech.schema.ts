import { SpeechForm } from '@ghentcdh/mela/generated/forms';
import { SpeechSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createResponseData,
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

const dtoSchema = SpeechSchema.pick({
  name: true,
});

const schema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  jsonSchema: SpeechForm,
  tableSchema,
  uri: '/api/speech',
});

export const SpeechFormSchema = schema.schema;

export class CreateSpeechDto extends schema.dto {}

export class ListSpeechDto extends createResponseData(SpeechSchema) {}
