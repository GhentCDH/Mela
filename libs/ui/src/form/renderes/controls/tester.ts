import { uiTypeIs } from '@jsonforms/core';
import { and, optionIs } from '@jsonforms/core/src/testers/testers';

export const isAutoCompleteControl = and(
  // uiTypeIs('Control'),
  optionIs('format', 'autocomplete'),
);

export const isTextAreaControl = and(
  uiTypeIs('Control'),
  optionIs('format', 'textArea'),
);
