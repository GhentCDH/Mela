import { createZodDto } from '@anatine/zod-nestjs';
import { LemaFormSchema } from '@mela/text/shared';

import { LemaWithRelationsSchema } from '@ghentcdh/mela/generated/types';
import { createResponseData } from '@ghentcdh/tools/form/api';

export class CreateLemaDto extends createZodDto(LemaFormSchema.dtoSchema) {}

export class ListLemaDto extends createResponseData(LemaWithRelationsSchema) {}
