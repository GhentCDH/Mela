import { createZodDto } from '@anatine/zod-nestjs';
import { PhraseFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms/api';
import { PhraseSchema } from '@ghentcdh/mela/generated/types';

export class CreatePhraseDto extends createZodDto(PhraseFormSchema.dtoSchema) {}

export class ListPhraseDto extends createResponseData(PhraseSchema) {}
