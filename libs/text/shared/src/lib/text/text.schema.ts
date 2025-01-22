import { z } from 'zod';

import { TextForm } from '@ghentcdh/mela/generated/forms';
import { AuthorSchema, TextSchema } from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
  TableBuilder,
  TextCellBuilder,
  createSchema,
} from '@ghentcdh/tools/form'; // TODO add autocomplete for textschema

// TODO add autocomplete for textschema

const uiSchema = LayoutBuilder.vertical()
  .addControls(
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.scope('#/properties/mela_id'),
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
  )
  .build();

const tableSchema = TableBuilder.init()
  .addControls(
    TextCellBuilder.scope('#/properties/id'),
    TextCellBuilder.scope('#/properties/mela_id'),
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
      ControlBuilder.scope('#/properties/mela_id'),
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
      // ControlBuilder.scope('#/properties/year'),
    ),
  )
  .build();

const dtoSchema = TextSchema.pick({
  name: true,
  mela_id: true,
  year: true,
}).extend({ author: AuthorSchema.extend({ id: z.string().optional() }) });

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
