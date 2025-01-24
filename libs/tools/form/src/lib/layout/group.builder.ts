import { Builder } from './builder';
import type { ElementBuilder } from './layout.builder';

export type GroupType = {
  type: 'Group';
  label: string;
  elements?: ElementBuilder[];
};

export class GroupBuilder extends Builder<GroupType> {
  private elements: Array<ElementBuilder> = [];

  private constructor(private readonly label: string) {
    super(label);
  }

  static label(label: string) {
    return new GroupBuilder(label);
  }

  addControl(control: ElementBuilder) {
    this.elements.push(control);
    return this;
  }

  addControls(...controls: Array<ElementBuilder>) {
    this.elements.push(...controls);
    return this;
  }

  override build(): GroupType {
    return {
      type: 'Group',
      label: this.label,
      elements: this.elements.map((e) => e.build()),
    } as unknown as GroupType;
  }
}
