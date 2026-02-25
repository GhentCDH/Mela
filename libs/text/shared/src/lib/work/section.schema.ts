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
  TextTranslation,
  TextWithRelations,
} from '@mela/generated-types';

import { TextTranslationDtoSchema } from '../text/text.schema';

const textContentStep =
  LayoutBuilder.horizontal<TextWithRelations>().addControls(
    ControlBuilder.properties('textContent')
      .detailFixed(
        LayoutBuilder.vertical<TextTranslation>().addControls(
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

const metaDataStep = LayoutBuilder.horizontal<Section>().addControls(
  ControlBuilder.properties('section_number').width('sm'),
  ControlBuilder.properties('title'),
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

const dtoSchema = SectionSchema.pick({
  title: true,
  section_number: true,
}).extend({
  text: z.array(
    z.object({
      id: z.string().optional(),
      textContent: z.array(TextTranslationDtoSchema),
    }),
  ),
  work: z.object({ id: z.string() }).optional(),
});

export const SectionFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  filterSchema,
  schema: SectionSchema,
  tableSchema,
  uri: '/section',
});
