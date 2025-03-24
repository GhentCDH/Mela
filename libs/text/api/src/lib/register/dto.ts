import { createZodDto } from '@anatine/zod-nestjs';
import { RegisterSchema } from '@generated/types';
import { RegisterFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms/api';

export class CreateRegisterDto extends createZodDto(
  RegisterFormSchema.dtoSchema,
) {}

export class ListRegisterDto extends createResponseData(RegisterSchema) {}
