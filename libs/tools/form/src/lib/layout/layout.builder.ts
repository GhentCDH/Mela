import { Builder } from './builder';
import type { CategoryBuilder } from './category.builder';
import type { ControlBuilder, ControlTypes } from './control.builder';
import type { GroupBuilder } from './group.builder';
import type { TextCellBuilder } from '../table/builder';

export type ElementBuilder =
  | ControlBuilder
  | LayoutBuilder
  | TextCellBuilder
  | CategoryBuilder
  | GroupBuilder;

export type LayoutType = {
  type: 'HorizontalLayout' | 'VerticalLayout';
  elements: Array<ControlTypes | LayoutType>;
};

export class LayoutBuilder extends Builder<LayoutType> {
  private elements: Array<ElementBuilder> = [];
  private options: any;

  protected constructor(
    type: 'HorizontalLayout' | 'VerticalLayout' | 'Categorization' | 'table',
    options = {},
  ) {
    super(type);
    this.options = options;
  }

  static horizontal() {
    return new LayoutBuilder('HorizontalLayout');
  }

  static stepper(showNavButtons = false) {
    return new LayoutBuilder('Categorization', {
      variant: 'stepper',
      showNavButtons: showNavButtons,
    });
  }

  static table() {
    return new LayoutBuilder('table');
  }

  static vertical() {
    return new LayoutBuilder('VerticalLayout');
  }

  addControl(control: ElementBuilder) {
    this.elements.push(control);
    return this;
  }

  addControls(...controls: Array<ElementBuilder>) {
    this.elements.push(...controls);
    return this;
  }

  override build(): LayoutType {
    return {
      type: this.type,
      elements: this.elements.map((e) => e.build()),
      options: this.options,
    } as LayoutType;
  }
}
