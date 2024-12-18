import { and, optionIs } from '@jsonforms/core/src/testers/testers';

import { ControlType } from '@ghentcdh/tools/form';

export const isAutoCompleteControl = and(
  // uiTypeIs('Control'),
  optionIs('format', ControlType.autocomplete)
);

export const isTextAreaControl = and(
  // uiTypeIs('Control'),
  optionIs('format', ControlType.textArea)
);
