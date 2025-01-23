import type { Meta, StoryFn } from '@storybook/vue3';

import { ControlBuilder, LayoutBuilder } from '@ghentcdh/tools/form';

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
  schema: {
    type: 'object',
    properties: {
      // examples
      stringControl: {
        type: 'string',
        maxLength: 5,
      },
      numberControl: {
        type: 'number',
      },
      integerControl: {
        type: 'number',
      },
      booleanControl: {
        type: 'boolean',
      },
      textAreaControl: {
        type: 'number',
      },
    },
    required: ['stringControl'],
  },
  uischema: LayoutBuilder.vertical()
    .addControls(
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.scope('#/properties/stringControl'),
      ),
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.scope('#/properties/numberControl'),
        ControlBuilder.scope('#/properties/integerControl'),
      ),
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.scope('#/properties/booleanControl'),
      ),
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.scope('#/properties/textAreaControl').textArea(),
      ),
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.scope('#/properties/autocomplete').autocomplete({
          uri: '',
          uriDetail: '',
          field: { id: '', label: '' },
        }),
      ),
    )
    .build(),
};
