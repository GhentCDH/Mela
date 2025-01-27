import { uiTypeIs } from '@jsonforms/core';
import {
  and,
  optionIs,
  or,
  schemaTypeIs,
} from '@jsonforms/core/src/testers/testers';

import { ControlType } from '@ghentcdh/tools/form';

export const isAutoCompleteControl = and(
  // uiTypeIs('Control'),
  optionIs('format', ControlType.autocomplete),
);

export const isTextAreaControl = and(
  uiTypeIs('Control'),
  optionIs('format', ControlType.textArea),
);

export const isStringFormat = and(
  uiTypeIs('Control'),
  or(optionIs('format', ControlType.string), schemaTypeIs('string')),
);

export const isMarkdownControl = and(
  uiTypeIs('Control'),
  optionIs('format', ControlType.markdown),
);
export const isFixedArray = and(
  schemaTypeIs('array'),
  optionIs('format', ControlType.fixedArray),
);
