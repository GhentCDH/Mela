import type { ColumnDef } from '@ghentcdh/json-forms/core';

export type TableAction = {
  label: string;
  action: <T>(data: T) => void;
};

export type DisplayColumn = ColumnDef & { component: any };
