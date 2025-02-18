import { z } from 'zod';

import {
  CategoryBuilder,
  ControlBuilder,
  LayoutBuilder,
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

import { getTextContentUri } from '../utils/uri';

// TODO add autocomplete for textschema
const textIdentifyStep =
  LayoutBuilder.horizontal<TextWithRelations>().addControls(
    ControlBuilder.asCustom('textContent', 'identify_text_blocks'),
  );

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
      uri: '/api/author?filter=name:',
      uriDetail: '/api/author/',
      field: {
        id: 'id',
        label: 'name',
      },
    }),
    ControlBuilder.properties('year').width('sm'),
  ),
);

const uiSchema = LayoutBuilder.stepper()
  .addControls(
    CategoryBuilder.label('Details').addControls(detailStep),
    CategoryBuilder.label('Text').addControls(textContentStep),
    CategoryBuilder.label('Identify').addControls(textIdentifyStep),
    CategoryBuilder.label('Annotate'),
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
})
  .extend({ id: z.string().optional() })
  .transform((data) => {
    return { ...data, uri: getTextContentUri(data) };
  });

const dtoSchema = TextSchema.pick({
  name: true,
  year: true,
}).extend({
  author: AuthorSchema.extend({
    id: z.string().optional(),
  }),
  textContent: z.array(TextContentDtoSchema),
});

export const TextFormSchema = createSchema({
  uiSchema,
  dtoSchema,
  jsonSchema: TextForm,
  uri: '/api/text',
  filterSchema,
  tableSchema,
});

export const textParseFileTypes = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];
