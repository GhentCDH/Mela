import type { Meta, StoryFn } from '@storybook/vue3';

import { ControlBuilder, LayoutBuilder } from '@ghentcdh/tools/form';

import { OwnerWithRelationsFormDetail } from './demo/owner';
import FormComponent from './form.component.vue';

export default {
  title: 'Components/Form',
  component: FormComponent,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { FormComponent },
  setup() {
    return { args };
  },
  template: '<FormComponent v-bind="args">{{ args.label }}</FormComponent>',
});

export const Default = Template.bind({});
Default.args = {
  id: 'default-form',
  schema: OwnerWithRelationsFormDetail,
  uischema: LayoutBuilder.vertical()
    .addControls(
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.scope('#/properties/name'),
        ControlBuilder.scope('#/properties/firstname'),
      ),
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.scope('#/properties/age').width('xs'),
        ControlBuilder.scope('#/properties/total'),
        ControlBuilder.scope('#/properties/boolean'),
      ),
      LayoutBuilder.horizontal()
        .addControls
        // ControlBuilder.scope('#/properties/comment').textArea(),
        (),
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.scope('#/properties/autocomplete').autocomplete({}),
      ),
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.scope('#/properties/emails').detail(
          LayoutBuilder.horizontal().addControls(
            ControlBuilder.scope('#/properties/email'),
          ),
        ),
      ),
    )
    .build(),
};

// TODO with different sizes
