import * as fs from 'fs';
import * as path from 'path';
import * as model from '../../generated/types/src/modelSchema';

export const generateDto = (dtoDir: string, model: any) => {
  if (fs.existsSync(dtoDir)) fs.rmSync(dtoDir, { recursive: true });

  fs.mkdirSync(`${dtoDir}`, { recursive: true });

  const importsDto = [`import { createZodDto } from '@anatine/zod-nestjs';`];

  const dtoExports: string[] = [];
  const formExports: string[] = [];

  Object.keys(model).forEach((key) => {
    const _name = key.replace('Schema', '');
    const nameDto = key.replace('Schema', 'Dto');
    const entry = (model as any)[key];

    const dtos = [
      importsDto,
      ' ',
      `import { ${key} } from '@mela/generated-types';`,
      ' ',
      `export class ${nameDto} extends createZodDto(${key}) {}`,
    ]
      .flat()
      .join('\n');

    fs.writeFileSync(path.join(dtoDir, `${_name}.dto.ts`), dtos);

    formExports.push(`export * from './${_name}.form';`);
    dtoExports.push(`export * from './${_name}.dto';`);
  });

  fs.writeFileSync(path.join(dtoDir, 'index.ts'), dtoExports.join('\n'));
};

const generatedDir = path.join(__dirname, '../../generated');
const dtoDir = path.join(generatedDir, 'dtos/src');
generateDto(dtoDir, model);
