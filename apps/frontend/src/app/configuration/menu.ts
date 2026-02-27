import type { ShellMenu } from '@ghentcdh/ui';

import { FormKey } from '../views/form/form.def';

export const menu = (): ShellMenu => {
  return [
    {
      label: 'Works',
      routerLink: 'work-index',
    },
    {
      label: 'Authors',
      routerLink: 'form',
      params: { formId: FormKey.author },
    },
    {
      label: 'Registers',
      routerLink: 'form',
      params: { formId: FormKey.register },
    },
    {
      label: 'Parts of speech',
      routerLink: 'form',
      params: { formId: FormKey.speech },
    },
    {
      label: 'Lemmas',
      routerLink: 'form',
      params: { formId: FormKey.lemma },
    },
  ];
};
