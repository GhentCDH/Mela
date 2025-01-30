import { z } from 'zod';

import { LemaForm } from '@ghentcdh/mela/generated/forms';
import type { Lema} from '@ghentcdh/mela/generated/types';
import { LemaSchema, SpeechSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
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

const tableSchema = TableBuilder.init<Lema>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('word'),
    TextCellBuilder.properties('speech').key('name').setSortId('speech.name'),
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

export const LemaFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  jsonSchema: LemaForm,
  tableSchema,
  uri: '/api/lema',
});
