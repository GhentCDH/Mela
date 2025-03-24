import { createZodDto } from '@anatine/zod-nestjs';
import { AuthorSchema } from '@generated/types';
import { AuthorFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms/api';

export class CreateAuthorDto extends createZodDto(AuthorFormSchema.dtoSchema) {}

export class ListAuthorDto extends createResponseData(AuthorSchema) {}
