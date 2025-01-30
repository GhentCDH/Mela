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
  format?: string;
  readonly?: boolean;
  label?: string;
  styles?: Partial<any>;
  elements?: any;
  elementLabelProp?: string;
}

export type ControlTypes = {
  type: 'Control' | 'Object' | 'TextCell';
  scope: string;
  options?: TextAreaOptions | AutocompleteOptions;
};

export class ControlBuilder extends Builder<ControlTypes> {
  private options: ControlOption = {
    format: 'Control',
    styles: {
      control: {
        wrapper: 'w-full',
      },
    },
  };

  private _detail?: LayoutBuilder;

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

  static properties(property: string): ControlBuilder {
    return new ControlBuilder(`#/properties/${property}`);
  }

  detail(layoutBuilder: LayoutBuilder, label?: string): ControlBuilder {
    this._detail = layoutBuilder;
    this.options = {
      ...(this.options ?? {}),
      elementLabelProp: label,
    };
    return this;
  }

  detailFixed(layoutBuilder: LayoutBuilder, label?: string): ControlBuilder {
    this._detail = layoutBuilder;
    this.options = {
      ...(this.options ?? {}),
      format: ControlType.fixedArray,
      elementLabelProp: label,
    };
    return this;
  }

  labelKey(labelKey: string): ControlBuilder {
    this.options = {
      ...(this.options ?? {}),
      labelKey: labelKey,
    };
    return this;
  }

  readonly(): ControlBuilder {
    this.options = {
      format: ControlType.string,
      readonly: true,
    };
    return this;
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

  width(width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): ControlBuilder {
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
