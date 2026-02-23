import { z } from 'zod';

import {
  ControlBuilder,
  createSchema,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
} from '@ghentcdh/json-forms-core';
import { ChapterForm } from '@mela/generated-forms';
import type {
  Chapter,
  TextContent,
  TextWithRelations,
} from '@mela/generated-types';
import { ChapterSchema } from '@mela/generated-types';

import { TextContentDtoSchema } from '../text/text.schema';

const textContentStep =
  LayoutBuilder.horizontal<TextWithRelations>().addControls(
    ControlBuilder.properties('textContent')
      .detailFixed(
        LayoutBuilder.vertical<TextContent>().addControls(
          ControlBuilder.properties('content').markdown(),
        ),
      )
      .labelKey('text_type'),
  );

const textStep = LayoutBuilder.horizontal<TextWithRelations>().addControls(
  ControlBuilder.properties('text')
    .detailFixed(textContentStep)
    .labelKey('text_type'),
);

const metaDataStep = LayoutBuilder.horizontal<Chapter>().addControls(
  ControlBuilder.properties('chapter_number').width('sm'),
  ControlBuilder.properties('name'),
);

const uiSchema = LayoutBuilder.vertical<Chapter>()
  .addControls(metaDataStep, textStep)
  .build();

const tableSchema = TableBuilder.init<Chapter>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('name'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical<Chapter>()
  .addControls(ControlBuilder.properties('name'))
  .build();

const dtoSchema = ChapterSchema.pick({
  name: true,
  chapter_number: true,
}).extend({
  text: z.array(
    z.object({
      id: z.string().optional(),
      textContent: z.array(TextContentDtoSchema),
    }),
  ),
  book: z.object({ id: z.string() }).optional(),
});

export const ChapterFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  jsonSchema: ChapterForm,
  tableSchema,
  uri: '/chapter',
});
