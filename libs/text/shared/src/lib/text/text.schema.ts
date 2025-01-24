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
  GroupBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/tools/form';

// TODO add autocomplete for textschema

const textStep = LayoutBuilder.horizontal().addControls(
  GroupBuilder.label('Source').addControls(
    ControlBuilder.scope('#/properties/source/properties/language'),
    ControlBuilder.scope('#/properties/source/properties/content').markdown(),
  ),
  GroupBuilder.label('Translation').addControls(
    ControlBuilder.scope('#/properties/translation/properties/language'),
    ControlBuilder.scope(
      '#/properties/translation/properties/content',
    ).markdown(),
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
    ControlBuilder.scope('#/properties/year'),
  ),
);

const uiSchema = LayoutBuilder.stepper()
  .addControls(
    CategoryBuilder.label('Details').addControls(detailStep),
    CategoryBuilder.label('Text').addControls(textStep),
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

const dtoSchema = TextSchema.pick({
  name: true,
  year: true,
}).extend({
  author: AuthorSchema.extend({
    id: z.string().optional(),
  }),
  source: TextContentSchema.pick({ content: true }).extend({
    language: z.string().default('Greek'),
  }),
  translation: TextContentSchema.pick({
    content: true,
  })
    .extend({
      language: z.string().default('English'),
    })
    .optional(),
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
