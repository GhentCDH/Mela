import { createZodDto } from '@anatine/zod-nestjs';
import { TextFormSchema } from '@mela/text/shared';

import { TextSchema } from '@ghentcdh/mela/generated/types';
import { createResponseData } from '@ghentcdh/tools/form/api';

export class CreateTextDto extends createZodDto(TextFormSchema.dtoSchema) {}

export class ListTextDto extends createResponseData(TextSchema) {}
