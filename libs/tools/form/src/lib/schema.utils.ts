import type { JsonSchema } from '@jsonforms/core';

type Field = {
  scope: string;
};

export const findProperty = <F extends Field>(
  column: F,
  schema: JsonSchema,
) => {
  //TODO check if we can use innerfunction for this
  //
  if (!column.scope) {
    return { id: null, property: null };
  }

  const id = column.scope?.substring('#/properties/'.length);
  const property = schema?.properties?.[id] ?? {};

  return { id, property } as { id: string; property: any };
};
