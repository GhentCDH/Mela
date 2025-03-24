import { createZodDto } from '@anatine/zod-nestjs';
import { LemaWithRelationsSchema } from '@generated/types';
import { LemaFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms/api';

export class CreateLemaDto extends createZodDto(LemaFormSchema.dtoSchema) {}

export class ListLemaDto extends createResponseData(LemaWithRelationsSchema) {}
