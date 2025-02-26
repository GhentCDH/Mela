import { Builder } from './builder';
import type { LayoutBuilder } from './layout.builder';

export const ControlType = {
  number: 'number',
  string: 'string',
  integer: 'Integer',
  autocomplete: 'autocomplete',
  textArea: 'textArea',
  markdown: 'markdown',
  fixedArray: 'fixedArray',
  custom: 'custom',
} as const;

export interface TextAreaOptions extends ControlOption {
  format: 'textArea';
}

export interface DetailOptions extends ControlOption {
  format: 'fixedArray';
}

export interface AutocompleteOptions extends ControlOption {
  format: 'autocomplete';
  uri: string;
  dataField?: string;
  field: {
    id: string;
    label: string;
  };
}

export interface ControlOption {
  format?: string;
  readonly?: boolean;
  label?: string;
  styles?: Partial<any>;
  elements?: any;
  elementLabelProp?: string;
  labelKey?: string;
}

export type ControlTypes = {
  type: 'Control' | 'Object' | 'TextCell';
  scope: string;
  options?: TextAreaOptions | AutocompleteOptions | DetailOptions;
};

export class ControlBuilder<
  TYPE,
  KEY = keyof TYPE,
> extends Builder<ControlTypes> {
  private options: ControlOption = {
    format: 'Control',
    styles: {
      control: {
        wrapper: 'w-full',
      },
    },
  };

  private _detail?: LayoutBuilder<any>;

  private constructor(
    private readonly scope: string,
    type = 'Control',
  ) {
    super(type);
  }

  static asObject<TYPE>(property: keyof TYPE): ControlBuilder<TYPE> {
    return new ControlBuilder<TYPE>(
      `#/properties/${property as string}`,
      'Object',
    );
  }

  static properties<TYPE>(property: keyof TYPE): ControlBuilder<TYPE> {
    return new ControlBuilder<TYPE>(`#/properties/${property as string}`);
  }

  static asCustom<TYPE>(
    property: keyof TYPE,
    type: string,
  ): ControlBuilder<TYPE> {
    const builder = new ControlBuilder<TYPE>(
      `#/properties/${property as string}`,
    );

    builder.options = {
      format: ControlType.custom,
      type,
    } as unknown as ControlOption;

    return builder;
  }

  detail<TYPE>(layoutBuilder: LayoutBuilder<TYPE>, label?: string) {
    this._detail = layoutBuilder;
    this.options = {
      ...(this.options ?? {}),
      elementLabelProp: label,
    };
    return this;
  }

  detailFixed<TYPE>(layoutBuilder: LayoutBuilder<TYPE>, label?: string) {
    this._detail = layoutBuilder;
    this.options = {
      ...(this.options ?? {}),
      format: ControlType.fixedArray,
      elementLabelProp: label,
    };
    return this;
  }

  labelKey(labelKey: string) {
    this.options = {
      ...(this.options ?? {}),
      labelKey: labelKey,
    };
    return this;
  }

  readonly(): ControlBuilder<TYPE> {
    this.options = {
      format: ControlType.string,
      readonly: true,
    };
    return this;
  }

  markdown(): ControlBuilder<TYPE> {
    this.options = { format: ControlType.markdown };

    return this;
  }

  textArea(options?: Omit<TextAreaOptions, 'format'>) {
    this.options = {
      format: ControlType.textArea,
      ...(options ?? {}),
    };
    return this;
  }

  autocomplete(options: Omit<AutocompleteOptions, 'format'>) {
    this.options = {
      format: ControlType.autocomplete,
      dataField: 'data',
      ...options,
    };
    return this;
  }

  width(width: 'xs' | 'sm' | 'md' | 'lg' | 'xl') {
    const sizes = {
      xs: 'w-12',
      sm: 'w-24',
      md: 'w-36',
      lg: 'w-48',
      xl: 'w-64',
    };
    this.options = {
      ...this.options,
      styles: {
        ...this.options?.styles,
        control: {
          wrapper: sizes[width] ?? sizes.sm,
        },
      },
    };

    return this;
  }

  override build(): ControlTypes {
    return {
      type: this.type,
      scope: this.scope,
      options: {
        ...this.options,
        detail: this._detail ? this._detail?.build() : undefined,
      },
    } as ControlTypes;
  }
}
