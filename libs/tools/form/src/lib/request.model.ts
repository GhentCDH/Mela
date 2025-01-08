import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const PositiveRequestNumber = () =>
  z.coerce.number().int().positive().nonnegative();

export const RequestSchema = z.object({
  page: PositiveRequestNumber().optional().default(1),
  pageSize: PositiveRequestNumber().optional().default(20),
  // TODO add sorting and so
  sort: z.string().optional().default('id'),
  sortDir: z.enum(['asc', 'desc']).optional().default('asc'),
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
