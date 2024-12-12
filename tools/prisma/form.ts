import { zodToJsonSchema } from 'zod-to-json-schema';
import * as model from '../../generated/types/modelSchema';
import * as fs from 'fs';
import * as path from 'path';
import { JsonSchema } from '@jsonforms/core';

export const generateForm = (dir: string) => {
  const dtoDir = path.join(dir, 'dtos');
  const formDir = path.join(dir, 'forms');

  if (fs.existsSync(dtoDir)) fs.rmdirSync(dtoDir, { recursive: true });
  if (fs.existsSync(formDir)) fs.rmdirSync(formDir, { recursive: true });

  fs.mkdirSync(dtoDir, { recursive: true });
  fs.mkdirSync(formDir, { recursive: true });

  const imports = [`import { JsonSchema } from '@jsonforms/core';`];

  const importsDto = [`import { createZodDto } from 'nestjs-zod';`];

  const dtoExports: string[] = [];
  const formExports: string[] = [];

  Object.keys(model).forEach((key) => {
    const name = key.replace('Schema', 'Form');
    const nameDto = key.replace('Schema', 'Dto');
    const entry = (model as any)[key];

    const jsonSchema = zodToJsonSchema(entry, 'Schema');
    const schema = jsonSchema.definitions!['Schema'] as JsonSchema;

    Object.entries(schema?.properties as any).forEach(
      ([key, prop]: [string, any]) => {
        if ('anyOf' in prop) {
          const type = prop.anyOf[0] as any;
          (schema.properties as any)[key] = {
            ...prop,
            anyOf: undefined,
            ...type,
          };
        }
      }
    );

    const forms = [
      imports,
      '',
      `export const ${name}Detail = ${JSON.stringify(jsonSchema, null, 2)};`,
      `export const ${name} = ${name}Detail.definitions!['Schema'] as JsonSchema;`,
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

    fs.writeFileSync(path.join(formDir, `${name}.form.ts`), forms);
    fs.writeFileSync(path.join(dtoDir, `${name}.dto.ts`), dtos);

    formExports.push(`export * from './${name}.form.ts';`);
    dtoExports.push(`export * from './${name}.dto.ts';`);
  });

  fs.writeFileSync(path.join(formDir, 'index.ts'), formExports.join('\n'));
  fs.writeFileSync(path.join(dtoDir, 'index.ts'), dtoExports.join('\n'));
};
