import { createZodDto } from '@anatine/zod-nestjs';
import { OpenApiZodAny } from '@anatine/zod-openapi';
import { z } from 'zod';

import { PositiveRequestNumber, RequestSchema } from './request.model';

export const ResponseRequestSchema = RequestSchema.extend({
  count: PositiveRequestNumber(),
  totalPages: PositiveRequestNumber(),
});

export const ResponseSchema = z.object({
  data: z.array(z.unknown()),
  request: ResponseRequestSchema,
});

export const createResponseData = <T extends OpenApiZodAny>(zodSchema: T) => {
  return createZodDto(ResponseSchema.extend({ data: z.array(zodSchema) }));
};

export class ResponseUnknown extends createResponseData(z.any()) {}
