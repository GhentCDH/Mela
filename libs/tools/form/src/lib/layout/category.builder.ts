import { Builder } from './builder';
import type { ElementBuilder } from './layout.builder';

type Rule = {
  effect: 'SHOW';
  condition: any;
};
export type CategoryType = {
  type: 'Category';
  label: string;
  elements?: ElementBuilder[];
  rule?: Rule;
};

export class CategoryBuilder extends Builder<CategoryType> {
  private rule: Rule = {
    effect: 'SHOW',
    condition: {},
  };
  private elements: Array<ElementBuilder> = [];

  private constructor(private readonly label: string) {
    super(label);
  }

  static label(label: string) {
    return new CategoryBuilder(label);
  }

  addControl(control: ElementBuilder) {
    this.elements.push(control);
    return this;
  }

  addControls(...controls: Array<ElementBuilder>) {
    this.elements.push(...controls);
    return this;
  }

  override build(): CategoryType {
    return {
      type: 'Category',
      label: this.label,
      rule: this.rule,
      elements: this.elements.map((e) => e.build()),
    } as unknown as CategoryType;
  }
}
