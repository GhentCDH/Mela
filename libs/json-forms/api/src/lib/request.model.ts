import { createZodDto } from '@anatine/zod-nestjs';

import {
  RequestSchema,
  RequestSchemaWithOffset,
} from '@ghentcdh/json-forms/core';

export class RequestDtoNoOffset extends createZodDto(RequestSchema) {}

export class RequestDto extends createZodDto(RequestSchemaWithOffset) {}
