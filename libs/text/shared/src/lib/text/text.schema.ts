import { z } from 'zod';

import {
  CategoryBuilder,
  ControlBuilder,
  createSchema,
  LayoutBuilder,
} from '@ghentcdh/json-forms-core'; // TODO add autocomplete for textschema
import { TextForm } from '@mela/generated-forms';
import type { TextContent, TextWithRelations } from '@mela/generated-types';
import { TextContentSchema, TextSchema } from '@mela/generated-types';

import { getTextContentUri } from '../utils/uri'; // TODO add autocomplete for textschema

// TODO add autocomplete for textschema

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

const uiSchema = LayoutBuilder.vertical()
  .addControls(CategoryBuilder.label('Text').addControls(textContentStep))
  .build();

export const TextContentDtoSchema = TextContentSchema.pick({
  text_type: true,
  content: true,
  language: true,
}).extend({ id: z.string().optional() });

export const TextContentResponseSchema = TextContentDtoSchema.transform(
  (data) => {
    return {
      ...data,
      uri: getTextContentUri(data),
    };
  },
);
export type TextContentDto = z.infer<typeof TextContentResponseSchema>;

const dtoSchema = TextSchema.pick({ chapter_id: true }).extend({
  textContent: z.array(TextContentDtoSchema),
});

const responseSchema = TextSchema.omit({
  textContent: true,
  chapter_id: true,
}).extend({
  textContent: z.array(TextContentResponseSchema),
});

export type TextCreate = z.infer<typeof dtoSchema>;

export const TextFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  responseSchema,
  jsonSchema: TextForm,
  uri: '/text',
  modalSize: 'xl',
});
