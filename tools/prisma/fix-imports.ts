import * as fs from 'fs';
import * as path from 'path';

const PrismaDeclarations = `
import type {
  InputJsonValue,
  JsonArray,
  JsonObject,
  JsonValue,
} from '@prisma/client/runtime/client';

export declare type _JsonValue = JsonValue;
export declare type _InputJsonValue = InputJsonValue;
export declare type _JsonArray = JsonArray;
export declare type _JsonObject = JsonObject;

export namespace Prisma {
  export const JsonNull = null;
  export const AnyNull = null;
  export type InputJsonValue = _InputJsonValue;
  export type JsonValue = _JsonValue;
  export type JsonArray = _JsonArray;
  export type JsonObject = _JsonObject;
}
export const JsonNull = null;
export const AnyNull = null;

    `;

const fixImport = (dir: string, files: string[]) => {
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      return fixImport(filePath, fs.readdirSync(filePath));
    }

    if (!filePath.endsWith('.ts')) return;

    const content = fs
      .readFileSync(filePath)
      .toString()
      .replace(/@prisma\/client/g, '../prisma');
    fs.writeFileSync(filePath, content);
  });
};

export const fixPrismaImports = (dir: string) => {
  // Go through all files in directory and replace @prisma/client with ../prisma
  const files = fs.readdirSync(dir);

  fixImport(dir, files);

  fs.writeFileSync(path.join(dir, `prisma.ts`), PrismaDeclarations);

  // TODO fix all imports
};
