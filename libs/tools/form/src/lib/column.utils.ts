import { JsonSchema } from '@jsonforms/core';

import { findProperty } from './schema.utils';

export type Column = {
  scope: string;
  label: string;
};

export type ColumnSchema = {
  columns: Column[];
};

export type ColumDef = {
  scope: string;
};

const findColumnDef = (column: ColumDef, schema: JsonSchema): Column => {
  const { id, property } = findProperty(column, schema);

  return { id, label: id, ...property } as unknown as Column;
};

export const createColumnSchema = (
  columns: ColumDef[] | undefined,
  schema: JsonSchema
): ColumnSchema | undefined => {
  if (!columns) return undefined;

  return {
    columns: columns.map((column) => findColumnDef(column, schema)),
  };
};
