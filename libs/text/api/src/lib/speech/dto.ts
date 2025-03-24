import { createZodDto } from '@anatine/zod-nestjs';
import { SpeechSchema } from '@generated/types';
import { SpeechFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms/api';

export class CreateSpeechDto extends createZodDto(SpeechFormSchema.dtoSchema) {}

export class ListSpeechDto extends createResponseData(SpeechSchema) {}
