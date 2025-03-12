import { AuthorFormSchema, RegisterFormSchema } from '@mela/text/shared';

import type { FormSchemaModel } from '@ghentcdh/json-forms/core';

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
    formSchema: AuthorFormSchema.schema,
    tableTitle: 'Authors',
    title: 'Author',
  },
  register: {
    formId: 'register',
    formSchema: RegisterFormSchema.schema,
    tableTitle: 'Registers',
    title: 'Register',
  },
  // speech: {
  //   formId: 'speech',
  //   formSchema: SpeechFormSchema.schema,
  //   tableTitle: 'Speech',
  //   title: 'Speech',
  // },
  // lema: {
  //   formId: 'lema',
  //   formSchema: LemaFormSchema.schema,
  //   title: 'Lema',
  //   tableTitle: 'Lemas',
  // },
};
