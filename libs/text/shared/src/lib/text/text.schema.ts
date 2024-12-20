import { z } from 'zod';

import { TextForm } from '@ghentcdh/mela/generated/forms';
import {
  AuthorSchema,
  TextSchema,
  TextWithRelationsSchema,
} from '@ghentcdh/mela/generated/types';
import {
  ControlBuilder,
  LayoutBuilder,
  createResponseData,
  createSchema,
} from '@ghentcdh/tools/form'; // TODO add autocomplete for textschema

// TODO add autocomplete for textschema

const uiSchema = LayoutBuilder.vertical()
  .addControls(
    LayoutBuilder.horizontal().addControls(
      ControlBuilder.scope('#/properties/mela_id'),
      ControlBuilder.scope('#/properties/name'),
      ControlBuilder.object('#/properties/author').autocomplete({
        uri: '/api/author?name=',
        uriDetail: '/api/author/',
        field: {
          id: 'id',
          label: 'name',
        },
      }),
      ControlBuilder.scope('#/properties/year')
    )
  )
  .build();

const columnDef = [
  {
    scope: '#/properties/id',
  },
  {
    scope: '#/properties/mela_id',
  },
  {
    scope: '#/properties/name',
  },
  {
    scope: '#/properties/year',
  },
  {
    scope: '#/properties/author',
  },
];

const dtoSchema = TextSchema.pick({
  name: true,
  mela_id: true,
  year: true,
}).extend({ author: AuthorSchema.extend({ id: z.string().optional() }) });

export const schema = createSchema({
  uiSchema,
  dtoSchema,
  jsonSchema: TextForm,
  uri: '/api/text',
  columnDef,
});

export const textFormSchema = schema.schema;

console.log(schema.schema);

export class CreateTextDto extends schema.dto {}

export class ListTextDto extends createResponseData(TextWithRelationsSchema) {}
