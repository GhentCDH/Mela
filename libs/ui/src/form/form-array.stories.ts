import type { Meta, StoryFn } from '@storybook/vue3';

import { ControlBuilder, LayoutBuilder } from '@ghentcdh/tools/form';

import { OwnerWithRelationsFormDetail } from './demo/owner';
import FormComponent from './form.component.vue';

export default {
  title: 'Components/Form/array',
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
  id: 'default-array-form',
  formData: { name: '123', emails: [{ email: '' }] },
  schema: OwnerWithRelationsFormDetail,
  uischema: LayoutBuilder.vertical()
    .addControls(
      ControlBuilder.scope('#/properties/name'),
      ControlBuilder.scope('#/properties/emails').detail(
        LayoutBuilder.horizontal().addControls(
          ControlBuilder.scope('#/properties/email'),
        ),
      ),
    )
    .build(),
};
