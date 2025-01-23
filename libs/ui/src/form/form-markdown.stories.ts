import type { Meta, StoryFn } from '@storybook/vue3';

import { ControlBuilder, LayoutBuilder } from '@ghentcdh/tools/form';

import FormComponent from './form.component.vue';

export default {
  title: 'Components/Form/markdown',
  component: FormComponent,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = (args) => ({
  components: { FormComponent },
  setup() {
    return { args };
  },
  template: `<div>
            <FormComponent v-bind="args"
            v-model="args.formData" />
<pre>{{args.formData}}</pre>
</div>`,
});

export const Default = Template.bind({});
Default.args = {
  id: 'default-form',
  formData: {
    stringControl: `Example text **Bold**
Example text *italic*
Example text ~~strikethrough~~

 some more text`,
  },
  schema: {
    type: 'object',
    properties: {
      // examples
      stringControl: {
        type: 'string',
        maxLength: 5,
      },
    },
    required: ['stringControl'],
  },
  uischema: LayoutBuilder.vertical()
    .addControls(
      LayoutBuilder.horizontal().addControls(
        ControlBuilder.scope('#/properties/stringControl').markdown(),
      ),
    )
    .build(),
};
