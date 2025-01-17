import { z } from 'zod';

import { LemaForm } from '@ghentcdh/mela/generated/forms';
import { LemaSchema, SpeechSchema } from '@ghentcdh/mela/generated/types';
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
    ControlBuilder.scope('#/properties/word'),
    ControlBuilder.scope('#/properties/link'),
    ControlBuilder.object('#/properties/speech').autocomplete({
      uri: '/api/speech?filter=name:',
      uriDetail: '/api/speech',
      field: {
        id: 'id',
        label: 'name',
      },
    }),
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.scope('#/properties/grammatical'),
      ControlBuilder.scope('#/properties/comparative'),
      ControlBuilder.scope('#/properties/superlative'),
      ControlBuilder.scope('#/properties/participle'),
    ),
  )
  .build();

const tableSchema = TableBuilder.init()
  .addControls(
    TextCellBuilder.scope('#/properties/id'),
    TextCellBuilder.scope('#/properties/word'),
    TextCellBuilder.scope('#/properties/speech')
      .key('id')
      .setSortId('speech.id'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical()
  .addControls(ControlBuilder.scope('#/properties/word'))
  .build();

const dtoSchema = LemaSchema.pick({
  word: true,
  link: true,
  grammatical: true,
  comparative: true,
  superlative: true,
  participle: true,
}).extend({ speech: SpeechSchema.extend({ id: z.string().optional() }) });

const schema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  jsonSchema: LemaForm,
  tableSchema,
  uri: '/api/lema',
});

export const LemaFormSchema = schema.schema;

export class CreateLemaDto extends schema.dto {}

export class ListLemaDto extends createResponseData(LemaSchema) {}
