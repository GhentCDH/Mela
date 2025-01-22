import { createZodDto } from '@anatine/zod-nestjs';
import type { OpenApiZodAny } from '@anatine/zod-openapi';
import { z } from 'zod';

import { ResponseSchema } from '@ghentcdh/tools/form';

export const createResponseData = <T extends OpenApiZodAny>(zodSchema: T) => {
  return createZodDto(ResponseSchema.extend({ data: z.array(zodSchema) }));
};

export class ResponseUnknown extends createResponseData(z.any()) {}
