import { z } from 'zod';

import {
  CategoryBuilder,
  ControlBuilder,
  LayoutBuilder,
  Size,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/json-forms/core'; // TODO add autocomplete for textschema
import { TextForm } from '@ghentcdh/mela/generated/forms';
import type {
  Text,
  TextContent,
  TextWithRelations,
} from '@ghentcdh/mela/generated/types';
import {
  AuthorSchema,
  TextContentSchema,
  TextSchema,
} from '@ghentcdh/mela/generated/types';

import { AuthorFormSchema } from '../author/author.schema';
import { getTextContentUri } from '../utils/uri';

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

const detailStep = LayoutBuilder.vertical<TextWithRelations>().addControls(
  LayoutBuilder.horizontal<TextWithRelations>().addControls(
    ControlBuilder.properties('name'),
    ControlBuilder.asObject('author').autocomplete({
      uri: `${AuthorFormSchema.schema.uri}?filter=name:`,
      field: {
        id: 'id',
        label: 'name',
      },
    }),
    ControlBuilder.properties('year').width('sm'),
  ),
);

const uiSchema = LayoutBuilder.vertical()
  .addControls(
    CategoryBuilder.label('Metadata').addControls(detailStep),
    CategoryBuilder.label('Text').addControls(textContentStep),
  )
  .build();

const tableSchema = TableBuilder.init<Text>()
  .addControls(
    TextCellBuilder.properties('id'),
    TextCellBuilder.properties('name'),
    TextCellBuilder.properties('year'),
    TextCellBuilder.properties('author').key('name').setSortId('author.name'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical()
  .addControls(
    LayoutBuilder.horizontal<Text>().addControls(
      ControlBuilder.properties('name'),
      // TODO autocomplete
      // ControlBuilder.object('#/properties/author').autocomplete({
      //   uri: '/api/author?name=',
      //   uriDetail: '/api/author/',
      //   field: {
      //     id: 'id',
      //     label: 'name',
      //   },
      // }),
      ControlBuilder.properties('year'),
    ),
  )
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

const dtoSchema = TextSchema.pick({
  name: true,
  year: true,
}).extend({
  author: AuthorSchema.extend({
    id: z.string().optional(),
  }),
  textContent: z.array(TextContentDtoSchema),
});

const responseSchema = TextSchema.omit({ textContent: true }).extend({
  author: AuthorSchema,
  textContent: z.array(TextContentResponseSchema),
});

export const TextFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  responseSchema,
  jsonSchema: TextForm,
  uri: '/api/text',
  filterSchema,
  tableSchema,
  modalSize: Size.xl,
});

export const textParseFileTypes = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];
