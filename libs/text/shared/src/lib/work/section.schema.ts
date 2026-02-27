import { z } from 'zod';

import {
  ControlBuilder,
  createSchema,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
} from '@ghentcdh/json-forms-core';
import {
  Section,
  SectionSchema,
  SectionTextSchema,
} from '@mela/generated-types';

const textStep = ControlBuilder.properties('section_text')
  .detailFixed(
    LayoutBuilder.collapse<Section>()
      .addControls(
        ControlBuilder.properties('content')
          .markdown()
          .hideLabel()
          .width('full'),
      )
      .titleKey('text_type'),
    { layout: 'row' },
  )
  .hideLabel();

const metaDataStep = LayoutBuilder.horizontal<Section>().addControls(
  ControlBuilder.properties('section_number').width('md'),
  ControlBuilder.properties('title').width('full'),
);

const uiSchema = LayoutBuilder.vertical<Section>()
  .addControls(metaDataStep, textStep)
  .build();

const tableSchema = TableBuilder.init<Section>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('title'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical<Section>()
  .addControls(ControlBuilder.properties('title'))
  .build();

export const SectionTextDtoSchema = SectionTextSchema.pick({
  language: true,
  content: true,
  text_type: true,
}).extend({ id: z.string().optional().nullish() });

const dtoSchema = SectionSchema.pick({
  title: true,
  section_number: true,
}).extend({
  section_text: z.array(SectionTextDtoSchema).min(2),
  work: z.object({ id: z.string() }),
});
export type SectionDto = z.infer<typeof dtoSchema>;

export const SectionFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  schema: SectionSchema,
  tableSchema,
  uri: '/section',
});
