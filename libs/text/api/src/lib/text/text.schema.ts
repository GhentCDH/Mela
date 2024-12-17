import { z } from 'zod';

import { TextForm } from '@ghentcdh/mela/generated/forms';
import { AuthorSchema, TextSchema } from '@ghentcdh/mela/generated/types';
import { ControlType, SchemaModel, createSchema } from '@ghentcdh/tools/form';

// TODO add autocomplete for textschema

const uiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/mela_id',
        },
        {
          type: 'Control',
          scope: '#/properties/name',
        },
        {
          type: 'Object',
          scope: '#/properties/author',
          options: {
            format: ControlType.autocomplete,
            uri: '/api/author?q=',
            uriDetail: '/api/author/',
            field: {
              id: 'id',
              label: 'name',
            },
          },
        },
        {
          type: 'Control',
          scope: '#/properties/year',
        },
      ],
    },
  ],
};

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

const formSchema = createSchema({
  uiSchema,
  dtoSchema,
  jsonSchema: TextForm,
  uri: '/api/text',
  columnDef,
});

export const textSchema: SchemaModel = formSchema.schema;

export class CreateTextDto extends formSchema.dto {}
