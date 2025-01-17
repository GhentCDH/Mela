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

export const SortDirEnum = z.enum(['asc', 'desc']);
export type SortDir = z.infer<typeof SortDirEnum>;

export const RequestSchema = z.object({
  page: PositiveRequestNumber().optional().default(1),
  pageSize: PositiveRequestNumber().optional().default(20),
  // TODO add sorting and so
  sort: z.string().optional().default('id'),
  sortDir: SortDirEnum.optional().default('asc'),
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
