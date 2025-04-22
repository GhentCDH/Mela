import type { ColumnDef } from '@ghentcdh/json-forms/core';

import type { IconEnum } from '../icons';

export type TableAction = {
  label?: string;
  icon?: IconEnum;
  action: <T>(data: T) => void;
};

export type DisplayColumn = ColumnDef & { component: any };
