import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const TextUploadDtoSchema = z.object({
  file: z.any(),
});

export class TextUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
