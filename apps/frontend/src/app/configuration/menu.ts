import { Menu } from '@ghentcdh/ui';

import { FormKey } from '../views/form/form.def';

export const menu = (): Menu => {
  return [
    { label: 'Text Index', routerLink: 'text-index' },
    {
      label: 'Authors',
      routerLink: 'form',
      params: { formId: FormKey.author },
    },
    {
      label: 'Register',
      routerLink: 'form',
      params: { formId: FormKey.register },
    },
    {
      label: 'Speech',
      routerLink: 'form',
      params: { formId: FormKey.speech },
    },
    {
      label: 'Lema',
      routerLink: 'form',
      params: { formId: FormKey.lema },
    },
  ];
};
