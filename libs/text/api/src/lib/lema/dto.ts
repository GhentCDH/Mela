import { createZodDto } from '@anatine/zod-nestjs';
import { LemaFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms/api';
import { LemaWithRelationsSchema } from '@ghentcdh/mela/generated/types';

export class CreateLemaDto extends createZodDto(LemaFormSchema.dtoSchema) {}

export class ListLemaDto extends createResponseData(LemaWithRelationsSchema) {}
