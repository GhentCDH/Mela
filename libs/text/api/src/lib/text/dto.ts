import { createZodDto } from '@anatine/zod-nestjs';
import { TextFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms/api';
import { TextSchema } from '@ghentcdh/mela/generated/types';

export class CreateTextDto extends createZodDto(TextFormSchema.dtoSchema) {}

export class ListTextDto extends createResponseData(TextSchema) {}
