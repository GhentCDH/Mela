import { z } from 'zod';

import { TextForm } from '@ghentcdh/mela/generated/forms';
import {
  AuthorSchema,
  TextContentSchema,
  TextSchema,
} from '@ghentcdh/mela/generated/types';
import {
  CategoryBuilder,
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/tools/form'; // TODO add autocomplete for textschema

// TODO add autocomplete for textschema

const textContentStep = LayoutBuilder.horizontal().addControls(
  ControlBuilder.scope('#/properties/textContent').detailFixed(
    LayoutBuilder.vertical().addControls(
      ControlBuilder.scope('#/properties/text_type'),
      ControlBuilder.scope('#/properties/language'),
      ControlBuilder.scope('#/properties/content').markdown(),
    ),
  ),
);

const detailStep = LayoutBuilder.vertical().addControls(
  LayoutBuilder.horizontal().addControls(
    ControlBuilder.scope('#/properties/name'),
    ControlBuilder.object('#/properties/author').autocomplete({
      uri: '/api/author?filter=name:',
      uriDetail: '/api/author/',
      field: {
        id: 'id',
        label: 'name',
      },
    }),
    ControlBuilder.scope('#/properties/year').width('small'),
  ),
);

const uiSchema = LayoutBuilder.stepper()
  .addControls(
    CategoryBuilder.label('Details').addControls(detailStep),
    CategoryBuilder.label('Text').addControls(textContentStep),
    CategoryBuilder.label('Link'),
    CategoryBuilder.label('Annotate'),
  )
  .build();

const tableSchema = TableBuilder.init()
  .addControls(
    TextCellBuilder.scope('#/properties/id'),
    TextCellBuilder.scope('#/properties/name'),
    TextCellBuilder.scope('#/properties/year'),
    TextCellBuilder.scope('#/properties/author')
      .key('name')
      .setSortId('author.name'),
  )
  .build();

const filterSchema = LayoutBuilder.vertical()
  .addControls(
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.scope('#/properties/name'),
      // TODO autocomplete
      // ControlBuilder.object('#/properties/author').autocomplete({
      //   uri: '/api/author?name=',
      //   uriDetail: '/api/author/',
      //   field: {
      //     id: 'id',
      //     label: 'name',
      //   },
      // }),
      ControlBuilder.scope('#/properties/year'),
    ),
  )
  .build();

export const TextContentDtoSchema = TextContentSchema.pick({
  text_type: true,
  content: true,
  language: true,
}).extend({ id: z.string().optional() });

export type TextContentDto = z.infer<typeof TextContentDtoSchema>;

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
