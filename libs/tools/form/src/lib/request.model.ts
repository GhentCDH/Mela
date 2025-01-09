import { createZodDto } from '@anatine/zod-nestjs';
import { isArray } from 'lodash-es';
import { z } from 'zod';

export const PositiveRequestNumber = () =>
  z.coerce.number().int().positive().nonnegative();
export const StringOrArray = () =>
  z
    .string()
    .or(z.array(z.string()))
    .transform((val) => {
      if (isArray(val)) return val;

      return [val];
    });

export type Filter = {
  key: string;
  value: string;
  operator: string;
};

export const buildFilter = (filters: string[]) => {
  const filter: Record<string, any> = {};

  filters.forEach((f) => {
    const [key, value, operator] = f.split(':') as string[];

    if (!key) return;

    filter[key] = {
      // TODO check if operator is possible
      [operator || 'contains']: value.toLowerCase(),
    };
  });

  return filter;
};

export const RequestSchema = z.object({
  page: PositiveRequestNumber().optional().default(1),
  pageSize: PositiveRequestNumber().optional().default(20),
  // TODO add sorting and so
  sort: z.string().optional().default('id'),
  sortDir: z.enum(['asc', 'desc']).optional().default('asc'),
  // Filter is of the format key:value:operator (e.g. name:john:eq) operator is optional
  filter: StringOrArray().optional().default([]),
});

export const RequestSchemaWithOffset = RequestSchema.transform((schema) => {
  const { page, pageSize, sort } = schema;

  return {
    ...schema,
    sort: sort || 'id',
    offset: (page - 1) * pageSize,
  };
});

export class RequestDtoNoOffset extends createZodDto(RequestSchema) {}

export class RequestDto extends createZodDto(RequestSchemaWithOffset) {}
