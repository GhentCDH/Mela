import { createZodDto } from '@anatine/zod-nestjs';
import { AuthorFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms-api';
import { AuthorSchema } from '@mela/generated-types';

export class CreateAuthorDto extends createZodDto(AuthorFormSchema.dtoSchema) {}

export class ListAuthorDto extends createResponseData(AuthorSchema) {}
