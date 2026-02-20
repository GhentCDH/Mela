import { createZodDto } from '@anatine/zod-nestjs';
import { RegisterFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms-api';
import { RegisterSchema } from '@mela/generated-types';

export class CreateRegisterDto extends createZodDto(
  RegisterFormSchema.dtoSchema,
) {}

export class ListRegisterDto extends createResponseData(RegisterSchema) {}
