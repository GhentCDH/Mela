import { JsonSchema } from '@jsonforms/core';

import { findProperty } from './schema.utils';

export type ColumDef = {
  scope: string;
};

export const findColumnDef = (column: ColumDef, schema: JsonSchema) => {
  const { id, property } = findProperty(column, schema);
  return { ...column, id, label: id, ...property };
};
