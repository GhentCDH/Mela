import type { WorkSheet} from 'xlsx';
import { utils } from 'xlsx';
import type { ZodSchema } from 'zod';

export type Dictionary = Record<string, string>;

export const parseSheet = <SCHEMA>(
  sheet: WorkSheet,
  dictionary: Dictionary,
  zodSchema: ZodSchema,
): SCHEMA[] => {
  const sheetData: Record<string, any>[] = utils.sheet_to_json(sheet);
  return sheetData.map((row) => {
    const rowData: Record<string, any> = {};

    Object.entries(dictionary).forEach(([key, value]) => {
      rowData[key] = row[value];
    });

    return zodSchema.parse(rowData);
  });
};
