import { generateSchema } from '@anatine/zod-openapi';

import * as fs from 'fs';
import * as path from 'path';

export const generateForm = (dtoDir: string, formDir: string, model: any) => {
  if (fs.existsSync(dtoDir)) fs.rmSync(dtoDir, { recursive: true });
  if (fs.existsSync(formDir)) fs.rmSync(formDir, { recursive: true });

  fs.mkdirSync(`${dtoDir}/lib`, { recursive: true });
  fs.mkdirSync(`${formDir}/lib`, { recursive: true });

  const importsDto = [`import { createZodDto } from '@anatine/zod-nestjs';`];

  const dtoExports: string[] = [];
  const formExports: string[] = [];

  Object.keys(model).forEach((key) => {
    const _name = key.replace('Schema', '');
    const name = key.replace('Schema', 'Form');
    const nameDto = key.replace('Schema', 'Dto');
    const entry = (model as any)[key];

    const jsonSchema = {
      ...generateSchema(entry),
      additionalProperties: true,
      $schema: 'http://json-schema.org/draft-07/schema#',
    };

    const forms = [
      '',
      `export const ${name} = ${JSON.stringify(jsonSchema, null, 2)};`,
      '',
    ]
      .flat()
      .join('\n');
    const dtos = [
      importsDto,
      ' ',
      `import { ${key} } from '../modelSchema';`,
      ' ',
      `export class ${nameDto} extends createZodDto(${key}) {}`,
    ]
      .flat()
      .join('\n');

    fs.writeFileSync(path.join(formDir, `${_name}.form.ts`), forms);
    fs.writeFileSync(path.join(dtoDir, `${_name}.dto.ts`), dtos);

    formExports.push(`export * from './${_name}.form';`);
    dtoExports.push(`export * from './${_name}.dto';`);
  });

  fs.writeFileSync(path.join(formDir, 'index.ts'), formExports.join('\n'));
  fs.writeFileSync(path.join(dtoDir, 'index.ts'), dtoExports.join('\n'));
};
