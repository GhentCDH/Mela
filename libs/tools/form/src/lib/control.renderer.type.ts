export const ControlType = {
  number: 'number',
  string: 'string',
  integer: 'Integer',
  autocomplete: 'autocomplete',
  textArea: 'textArea',
} as const;

export const ControlRendererType = {
  number: 'NumberControlRenderer',
  string: 'StringControlRenderer',
  integer: 'IntegerControlRenderer',
  autocomplete: 'AutocompleteControlRenderer',
  textArea: 'TextAreaControlRenderer',
} as const;
