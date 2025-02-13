import type { ColumnDef } from '@ghentcdh/tools/form';

export type TableAction = {
  label: string;
  action: <T>(data: T) => void;
};

export type DisplayColumn = ColumnDef & { component: any };
