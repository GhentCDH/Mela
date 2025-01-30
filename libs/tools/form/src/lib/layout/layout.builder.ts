import { BuilderWithElements } from './builder';
import type { CategoryBuilder } from './category.builder';
import type { ControlBuilder, ControlTypes } from './control.builder';
import type { GroupBuilder } from './group.builder';
import type { TextCellBuilder } from '../table/builder';

export type ElementBuilder<TYPE> =
  | ControlBuilder<TYPE>
  | LayoutBuilder<TYPE>
  | CategoryBuilder<TYPE>
  | GroupBuilder<TYPE>
  | TextCellBuilder<TYPE>;

export type LayoutType = {
  type: 'HorizontalLayout' | 'VerticalLayout';
  elements: Array<ControlTypes | LayoutType>;
};

export class LayoutBuilder<TYPE> extends BuilderWithElements<LayoutType, TYPE> {
  private options: any;

  protected constructor(
    type: 'HorizontalLayout' | 'VerticalLayout' | 'Categorization' | 'table',
    options = {},
  ) {
    super(type);
    this.options = options;
  }

  static horizontal<TYPE>() {
    return new LayoutBuilder<TYPE>('HorizontalLayout');
  }

  static stepper(hideNavButtons = false) {
    return new LayoutBuilder('Categorization', {
      variant: 'stepper',
      showNavButtons: !hideNavButtons,
    });
  }

  static table() {
    return new LayoutBuilder('table');
  }

  static vertical<TYPE>() {
    return new LayoutBuilder<TYPE>('VerticalLayout');
  }

  override build(): LayoutType {
    return {
      type: this.type,
      elements: this.buildElements(),
      options: this.options,
    } as LayoutType;
  }
}
