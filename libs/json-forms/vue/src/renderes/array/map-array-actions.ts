import type { Router } from 'vue-router';

import type { ArrayAction, ArrayActionType } from '@ghentcdh/json-forms/core';
import { IconEnum } from '@ghentcdh/ui';

export type Action = {
  label: string;
  icon: IconEnum;
  show: (element: any) => boolean;
};

const actionMap: Record<
  ArrayActionType,
  (router: Router, action: ArrayAction) => Action
> = {
  edit: (router, action) => ({
    label: 'edit',
    icon: IconEnum.Edit,
    show: (element: any) => !!element[action.idField],
  }),
};

export const mapArrayActions = (
  router: Router,
  actions: ArrayAction[],
): Action[] => {
  return actions.map((a) => actionMap[a.type](router, a)).filter((a) => !!a);
};
