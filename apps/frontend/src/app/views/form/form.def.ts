import {
  AuthorFormSchema,
  LemmaFormSchema,
  RegisterFormSchema,
  SpeechFormSchema,
} from '@mela/text/shared';

import type { FormSchemaModel } from '@ghentcdh/json-forms-core';

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
  lemma = 'lemma',
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
  speech: {
    formId: 'speech',
    formSchema: SpeechFormSchema.schema,
    tableTitle: 'Speech',
    title: 'Speech',
  },
  lemma: {
    formId: 'lemma',
    formSchema: LemmaFormSchema.schema,
    title: 'Lemma',
    tableTitle: 'Lemmas',
  },
};
