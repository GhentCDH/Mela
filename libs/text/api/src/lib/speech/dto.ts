import { createZodDto } from '@anatine/zod-nestjs';
import { SpeechFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms/api';
import { SpeechSchema } from '@ghentcdh/mela/generated/types';

export class CreateSpeechDto extends createZodDto(SpeechFormSchema.dtoSchema) {}

export class ListSpeechDto extends createResponseData(SpeechSchema) {}
