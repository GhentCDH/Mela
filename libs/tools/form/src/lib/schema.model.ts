import { createZodDto } from '@anatine/zod-nestjs';
import { generateSchema } from '@anatine/zod-openapi';
import { JsonSchema } from '@jsonforms/core';
import { Layout } from '@jsonforms/core/src/models/uischema';
import { ZodObject } from 'zod';

export type JsonFormsLayout = {
  uiSchema: Layout;
  schema: JsonSchema;
};

export type FormSchemaModel = {
  form: JsonFormsLayout;
  table?: JsonFormsLayout;

  uri: string;
};

export const createSchema = (props: {
  uiSchema: any;
  jsonSchema: JsonSchema;
  tableSchema?: JsonSchema;
  // TODO extract dto schema from uischema
  dtoSchema: ZodObject<any>;
  uri: string;
}) => {
  const dtoSchema = props.dtoSchema;

  const detail = {
    ...generateSchema(dtoSchema),
    additionalProperties: true,
    $schema: 'http://json-schema.org/draft-07/schema#',
  };

  const dto = class CreateDto extends createZodDto(dtoSchema) {};

  return {
    dto,
    schema: {
      form: {
        uiSchema: props.uiSchema,
        schema: detail,
      },
      table: props.tableSchema
        ? {
            uiSchema: props.tableSchema,
            schema: props.jsonSchema,
          }
        : undefined,
      uri: props.uri,
    } as FormSchemaModel,
  };
};
