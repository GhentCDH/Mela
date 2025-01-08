import { JsonSchema } from '@jsonforms/core';

import { TextCellType } from './builder';
import { findProperty } from '../schema.utils';

export const findColumnDef = (column: TextCellType, schema: JsonSchema) => {
  const { id, property } = findProperty(column, schema);
  return { ...column, id, label: id, ...property };
};
