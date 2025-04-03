import { generateSchema } from '@anatine/zod-openapi';
import type { JsonSchema } from '@jsonforms/core';
import type { Layout } from '@jsonforms/core/src/models/uischema';
import { cloneDeep } from 'lodash-es';
import type { ZodObject } from 'zod';

export enum Size {
  xs = 'xs',
  sm = 'sm',
  lg = 'lg',
  xl = 'xl',
}

export type JsonFormsLayout = {
  uiSchema: Layout;
  schema: JsonSchema;
  modalSize?: Size;
};

export type FormSchemaModel = {
  form: JsonFormsLayout;
  table?: JsonFormsLayout;
  filter?: JsonFormsLayout;

  uri: string;
  searchUri: string;
};

export const createSchema = (props: {
  uiSchema: any;
  jsonSchema: JsonSchema;
  tableSchema?: JsonSchema;
  filterSchema?: JsonSchema;
  // TODO extract dto schema from uischema
  dtoSchema: ZodObject<any>;
  responseSchema?: ZodObject<any>;
  uri: string;
  searchUri?: string;
  modalSize?: Size;
}) => {
  const dtoSchema = props.dtoSchema;

  const detail = {
    ...generateSchema(dtoSchema),
    additionalProperties: true,
    $schema: 'http://json-schema.org/draft-07/schema#',
  };

  const filterSchema = cloneDeep(props.jsonSchema);
  filterSchema.required = [];

  return {
    dtoSchema,
    responseSchema: props.responseSchema ?? dtoSchema,
    schema: {
      form: {
        uiSchema: props.uiSchema,
        schema: detail,
        modalSize: props.modalSize ?? 'sm',
      },
      table: props.tableSchema
        ? {
            uiSchema: props.tableSchema,
            schema: props.jsonSchema,
          }
        : undefined,
      filter: props.filterSchema
        ? {
            uiSchema: props.filterSchema,
            schema: filterSchema,
          }
        : undefined,
      uri: props.uri,
      searchUri: props.searchUri ?? `${props.uri}?filter=`,
    } as FormSchemaModel,
  };
};
