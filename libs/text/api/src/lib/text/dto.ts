import { createZodDto } from '@anatine/zod-nestjs';
import { TextSchema } from '@generated/types';
import { TextFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms/api';

export class CreateTextDto extends createZodDto(TextFormSchema.dtoSchema) {}

export class ListTextDto extends createResponseData(TextSchema) {}
