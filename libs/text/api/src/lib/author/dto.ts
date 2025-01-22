import { createZodDto } from '@anatine/zod-nestjs';
import { AuthorFormSchema } from '@mela/text/shared';

import { AuthorSchema } from '@ghentcdh/mela/generated/types';
import { createResponseData } from '@ghentcdh/tools/form/api';

export class CreateAuthorDto extends createZodDto(AuthorFormSchema.dtoSchema) {}

export class ListAuthorDto extends createResponseData(AuthorSchema) {}
