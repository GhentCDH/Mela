import { createZodDto } from '@anatine/zod-nestjs';
import { RegisterFormSchema } from '@mela/text/shared';

import { RegisterSchema } from '@ghentcdh/mela/generated/types';
import { createResponseData } from '@ghentcdh/tools/form/api';

export class CreateRegisterDto extends createZodDto(
  RegisterFormSchema.dtoSchema,
) {}

export class ListRegisterDto extends createResponseData(RegisterSchema) {}
