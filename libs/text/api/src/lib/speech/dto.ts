import { createZodDto } from '@anatine/zod-nestjs';
import { SpeechFormSchema } from '@mela/text/shared';

import { SpeechSchema } from '@ghentcdh/mela/generated/types';
import { createResponseData } from '@ghentcdh/tools/form/api';

export class CreateSpeechDto extends createZodDto(SpeechFormSchema.dtoSchema) {}

export class ListSpeechDto extends createResponseData(SpeechSchema) {}
