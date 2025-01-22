import { createZodDto } from '@anatine/zod-nestjs';
import { PhraseFormSchema } from '@mela/text/shared';

import { PhraseSchema } from '@ghentcdh/mela/generated/types';
import { createResponseData } from '@ghentcdh/tools/form/api';

export class CreatePhraseDto extends createZodDto(PhraseFormSchema.dtoSchema) {}

export class ListPhraseDto extends createResponseData(PhraseSchema) {}
