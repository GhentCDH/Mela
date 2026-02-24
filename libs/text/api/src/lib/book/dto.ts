import { createZodDto } from '@anatine/zod-nestjs';
import { BookFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms-api';
import { BookSchema } from '@mela/generated-types';

export class CreateBookDto extends createZodDto(BookFormSchema.dtoSchema) {}

export class ListBookDto extends createResponseData(BookSchema) {}
