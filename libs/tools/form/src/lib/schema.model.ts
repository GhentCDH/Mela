import { createZodDto } from '@anatine/zod-nestjs';
import { JsonSchema } from '@jsonforms/core';
import { ZodObject } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

import { ColumDef, ColumnSchema, createColumnSchema } from './column.utils';

export type SchemaModel = {
  uiSchema: any;
  formSchema: JsonSchema;
  columnSchema?: ColumnSchema;
  uri: string;
};

export const createSchema = (props: {
  uiSchema: any;
  jsonSchema: JsonSchema;
  // TODO extract dto schema from schema
  dtoSchema: ZodObject<any>;
  columnDef?: ColumDef[];
  uri: string;
}) => {
  const dtoSchema = props.dtoSchema;

  const detail = zodToJsonSchema(props.dtoSchema, {
    removeAdditionalStrategy: 'strict',
  }) as JsonSchema;

  const dto = class CreateDto extends createZodDto(dtoSchema) {};

  return {
    dto,
    schema: {
      schema: props.jsonSchema,
      uiSchema: props.uiSchema,
      formSchema: detail,
      columnSchema: createColumnSchema(props.columnDef, props.jsonSchema),
      uri: props.uri,
    } as SchemaModel,
  };
};
