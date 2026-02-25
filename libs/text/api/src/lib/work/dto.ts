import { createZodDto } from '@anatine/zod-nestjs';
import { WorkFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms-api';
import { WorkSchema } from '@mela/generated-types';

export class CreateWorkDto extends createZodDto(WorkFormSchema.dtoSchema) {}

export class ListWorkDto extends createResponseData(WorkSchema) {}
