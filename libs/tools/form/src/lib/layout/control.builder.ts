import { Builder } from './builder';

export const ControlType = {
  number: 'number',
  string: 'string',
  integer: 'Integer',
  autocomplete: 'autocomplete',
  textArea: 'textArea',
  markdown: 'markdown',
} as const;

export interface TextAreaOptions extends ControlOption {
  format: 'textArea';
}

export interface AutocompleteOptions extends ControlOption {
  format: 'autocomplete';
  uri: string;
  uriDetail: string;
  field: {
    id: string;
    label: string;
  };
}

export interface ControlOption {
  format: string;
}

export type ControlTypes = {
  type: 'Control' | 'Object' | 'TextCell';
  scope: string;
  options?: TextAreaOptions | AutocompleteOptions;
};

export class ControlBuilder extends Builder<ControlTypes> {
  private options: ControlOption | undefined;

  private constructor(
    private readonly scope: string,
    type = 'Control',
  ) {
    super(type);
  }

  static object(scope: string) {
    return new ControlBuilder(scope, 'Object');
  }

  static scope(scope: string): ControlBuilder {
    return new ControlBuilder(scope);
  }

  markdown(): ControlBuilder {
    this.options = { format: ControlType.markdown };

    return this;
  }

  textArea(options?: Omit<TextAreaOptions, 'format'>): ControlBuilder {
    this.options = {
      format: ControlType.textArea,
      ...(options ?? {}),
    };
    return this;
  }

  autocomplete(options: Omit<AutocompleteOptions, 'format'>): ControlBuilder {
    this.options = {
      format: ControlType.autocomplete,
      ...options,
    };
    return this;
  }

  override build(): ControlTypes {
    return {
      type: this.type,
      scope: this.scope,
      options: this.options,
    } as ControlTypes;
  }
}
