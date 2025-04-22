import type { ShellMenu } from '@ghentcdh/ui';

import { FormKey } from '../views/form/form.def';

export const menu = (): ShellMenu => {
  return [
    {
      label: 'Books',
      routerLink: 'book-index',
    },
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
      label: 'Lemma',
      routerLink: 'form',
      params: { formId: FormKey.lemma },
    },
  ];
};
