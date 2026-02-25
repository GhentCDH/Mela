import { z } from 'zod';

import {
  CategoryBuilder,
  ControlBuilder,
  createSchema,
  LayoutBuilder,
} from '@ghentcdh/json-forms-core'; // TODO add autocomplete for textschema
import type { TextTranslation, TextWithRelations } from '@mela/generated-types';
import { TextSchema, TextTranslationSchema } from '@mela/generated-types';

import { getTextTranslationUri } from '../utils/uri'; // TODO add autocomplete for textschema

// TODO add autocomplete for textschema

const TextTranslationStep =
  LayoutBuilder.horizontal<TextWithRelations>().addControls(
    ControlBuilder.properties('TextTranslation')
      .detailFixed(
        LayoutBuilder.vertical<TextTranslation>().addControls(
          ControlBuilder.properties('content').markdown(),
        ),
      )
      .labelKey('text_type'),
  );

const uiSchema = LayoutBuilder.vertical()
  .addControls(CategoryBuilder.label('Text').addControls(TextTranslationStep))
  .build();

export const TextTranslationDtoSchema = TextTranslationSchema.pick({
  text_type: true,
  content: true,
  language: true,
}).extend({ id: z.string().optional() });

export const TextTranslationResponseSchema = TextTranslationDtoSchema.transform(
  (data) => {
    return {
      ...data,
      uri: getTextTranslationUri(data),
    };
  },
);
export type TextTranslationDto = z.infer<typeof TextTranslationResponseSchema>;

const dtoSchema = TextSchema.pick({ section_id: true }).extend({
  TextTranslation: z.array(TextTranslationDtoSchema),
});

const responseSchema = TextSchema.omit({
  textTranslation: true,
  section_id: true,
}).extend({
  TextTranslation: z.array(TextTranslationResponseSchema),
});

export type TextCreate = z.infer<typeof dtoSchema>;

export const TextFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  responseSchema,
  schema: TextSchema,
  uri: '/text',
  modalSize: 'xl',
});
