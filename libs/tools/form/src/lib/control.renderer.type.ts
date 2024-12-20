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

export interface ControlOption {
  format: string;
}

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

export type ControlType = {
  type: 'Control' | 'Object';
  scope: string;
  options?: TextAreaOptions | AutocompleteOptions;
};

export type LayoutType = {
  type: 'HorizontalLayout' | 'VerticalLayout';
  elements: Array<ControlType | LayoutType>;
};

export class ControlBuilder {
  private control: ControlType;

  private constructor(scope: string, type = 'Control') {
    this.control = { scope, type };
  }

  static object(scope: string) {
    return new ControlBuilder(scope, 'Object');
  }

  static scope(scope: string): ControlBuilder {
    return new ControlBuilder(scope);
  }

  textArea(options?: Omit<TextAreaOptions, 'format'>): ControlBuilder {
    this.control.options = {
      format: ControlType.textArea,
      ...(options ?? {}),
    };
    return this;
  }

  autocomplete(options: Omit<AutocompleteOptions, 'format'>): ControlBuilder {
    this.control.options = {
      format: ControlType.autocomplete,
      ...options,
    };
    return this;
  }

  build(): ControlType {
    return this.control;
  }
}

export class LayoutBuilder {
  private elements: Array<ControlBuilder | LayoutBuilder> = [];

  private constructor(
    private readonly type: 'HorizontalLayout' | 'VerticalLayout'
  ) {}

  static horizontal() {
    return new LayoutBuilder('HorizontalLayout');
  }

  static vertical() {
    return new LayoutBuilder('VerticalLayout');
  }

  addControl(control: ControlBuilder | LayoutBuilder) {
    this.elements.push(control);
    return this;
  }

  addControls(...controls: Array<ControlBuilder | LayoutBuilder>) {
    this.elements.push(...controls);
    return this;
  }

  build() {
    return {
      type: this.type,
      elements: this.elements.map((e) => e.build()),
    } as LayoutType;
  }
}
