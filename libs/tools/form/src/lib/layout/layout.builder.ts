import { Builder } from './builder';
import type { ControlBuilder, ControlType } from './control.builder';
import type { TextCellBuilder } from '../table/builder';

export type ElementBuilder = ControlBuilder | LayoutBuilder | TextCellBuilder;

export type LayoutType = {
  type: 'HorizontalLayout' | 'VerticalLayout';
  elements: Array<ControlType | LayoutType>;
};

export class LayoutBuilder extends Builder<LayoutType> {
  private elements: Array<ElementBuilder> = [];

  protected constructor(type: 'HorizontalLayout' | 'VerticalLayout' | 'table') {
    super(type);
  }

  static horizontal() {
    return new LayoutBuilder('HorizontalLayout');
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
    } as LayoutType;
  }
}
