import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const PositiveRequestNumber = () =>
  z.coerce.number().int().positive().nonnegative();

export const RequestSchema = z.object({
  page: PositiveRequestNumber().optional().default(1),
  pageSize: PositiveRequestNumber().optional().default(20),
  // TODO add sorting and so
});

export const RequestSchemaWithOffset = RequestSchema.transform(
  ({ page, pageSize }) => {
    return {
      page: page,
      pageSize: pageSize,
      offset: (page - 1) * pageSize,
    };
  }
);

export class RequestDtoNoOffset extends createZodDto(RequestSchema) {}

export class RequestDto extends createZodDto(RequestSchemaWithOffset) {}
