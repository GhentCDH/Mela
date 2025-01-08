import { Builder } from '../layout/builder';
import { LayoutBuilder } from '../layout/layout.builder';

export interface TextCellOption {
  format: 'TextCell';
  sortId?: string;
}

export interface KeyValueOption extends Omit<TextCellOption, 'format'> {
  format: 'keyValue';
  key: string;
}

export type TextCellType = {
  type: 'TextCell';
  scope: string;
  options?: KeyValueOption;
};

export class TextCellBuilder extends Builder<TextCellType> {
  private options: KeyValueOption | TextCellOption | undefined;

  private constructor(
    private readonly scope: string,
    type = 'TextCell',
  ) {
    super(type);
  }

  static scope(scope: string): TextCellBuilder {
    return new TextCellBuilder(scope);
  }

  key(key: string): TextCellBuilder {
    this.options = {
      format: 'keyValue',
      key: key,
    };
    return this;
  }

  setSortId(sortId: string): TextCellBuilder {
    this.options = {
      ...(this.options ?? { format: 'TextCell' }),
      sortId: sortId,
    };
    return this;
  }

  override build(): TextCellType {
    return {
      type: this.type,
      scope: this.scope,
      options: this.options,
    } as TextCellType;
  }
}

export class TableBuilder {
  private builder: LayoutBuilder;

  private constructor() {
    this.builder = LayoutBuilder.table();
  }

  static init() {
    return new TableBuilder();
  }

  addControl(control: TextCellBuilder) {
    this.builder.addControls(control);
    return this;
  }

  addControls(...controls: Array<TextCellBuilder>) {
    this.builder.addControls(...controls);
    return this;
  }

  build() {
    return this.builder.build();
  }
}
