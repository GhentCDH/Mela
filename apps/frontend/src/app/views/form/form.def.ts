import {
  LemaFormSchema,
  RegisterFormSchema,
  SpeechFormSchema,
  authorFormSchema,
} from '@mela/text/shared';

import { FormSchemaModel } from '@ghentcdh/tools/form';

type FormDef = {
  formId: string;
  formSchema: FormSchemaModel;
  tableTitle: string;
  title: string;
};

export enum FormKey {
  author = 'author',
  register = 'register',
  speech = 'speech',
  lema = 'lema',
}

export const FormDictionary: Record<FormKey, FormDef> = {
  author: {
    formId: 'author',
    formSchema: authorFormSchema,
    tableTitle: 'Authors',
    title: 'Author',
  },
  register: {
    formId: 'register',
    formSchema: RegisterFormSchema,
    tableTitle: 'Registers',
    title: 'Register',
  },
  speech: {
    formId: 'speech',
    formSchema: SpeechFormSchema,
    tableTitle: 'Speech',
    title: 'Speech',
  },
  lema: {
    formId: 'lema',
    formSchema: LemaFormSchema,
    title: 'Lema',
    tableTitle: 'Lemas',
  },
};
